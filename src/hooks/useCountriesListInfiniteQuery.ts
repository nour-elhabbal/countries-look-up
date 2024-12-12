import { useInfiniteQuery } from "@tanstack/react-query";

import type { Continent } from "@/types";
import { getCountriesList } from "@/utils";

export const useCountriesListInfiniteQuery = (
  continent: Continent,
  query: string
) => {
  const queryKey = [
    "countries",
    continent,
    query[query.length - 1] === "." ? "" : query,
  ];

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: ({ pageParam }) => {
        return getCountriesList(
          {
            continent,
            query,
          },
          pageParam
        );
      },

      refetchOnWindowFocus: false,

      staleTime: 60000,

      initialPageParam: 1,

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.meta?.current_page === lastPage?.meta?.last_page) return;

        return lastPage?.meta?.current_page
          ? lastPage.meta.current_page + 1
          : allPages[allPages.length - 1]?.meta?.current_page;
      },
    });

  return {
    error: data?.pages[data.pages.length - 1]?.error,
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    queryKey,
  };
};
