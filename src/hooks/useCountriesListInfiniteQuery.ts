import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { Continent } from "@/types";
import { getCountriesList } from "@/utils";

export const useCountriesListInfiniteQuery = (
  continent: Continent,
  query: string,
  inView: boolean
) => {
  const { data, refetch, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["countries", continent, query],

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

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (query[query.length - 1] === ".") return;

    refetch();
  }, [continent, query, refetch]);

  return {
    error: data?.pages[data.pages.length - 1]?.error,
    current_page: data?.pages[data.pages.length - 1]?.meta?.current_page,
    last_page: data?.pages[data.pages.length - 1]?.meta?.last_page,
    data,
    isLoading,
    isFetchingNextPage,
  };
};
