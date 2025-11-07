import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';

import type { Country, QueryParams } from '@/types';
import { countries } from '@/api/countries';

export const queryKey = (queryParams: QueryParams) => [queryParams.region, queryParams.query] as const;

type QueryKey = ReturnType<typeof queryKey>;

const PAGE_SIZE = 20 as const;

export const queryFn = async ({
  queryKey: [region = '', query],
  pageParam,
}: QueryFunctionContext<QueryKey, number>) => {
  const path = region === '' ? '/countries' : `region/${region.toLowerCase()}`;
  console.log('Server fetching path:', path);

  const data = await countries
    .get<Country[]>(path)
    .then(res => res.data)
    .then(res =>
      !!!query
        ? res
        : res.filter(country => {
            let regex = RegExp(query, 'i');

            if (query.startsWith('.')) {
              regex = RegExp(query.slice(1), 'i');

              return regex.test(country.alpha2Code);
            }

            return regex.test(country.name);
          })
    );

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedData = data.slice(start, end);

  return {
    paginatedData,
    nextPage: end < data.length ? pageParam + 1 : undefined,
  };
};

export const useCountriesInfiniteQuery = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: queryKey(params),
    queryFn,
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

useCountriesInfiniteQuery.queryKey = queryKey;
useCountriesInfiniteQuery.queryFn = queryFn;
