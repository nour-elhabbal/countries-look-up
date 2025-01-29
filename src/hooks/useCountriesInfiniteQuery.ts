import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';

import type { Continent, CountriesListApiResponse, QueryParams } from '@/types';
import { countries } from '@/api/countries';

const queryKey = (queryParams: QueryParams) => ['countries', queryParams] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = async ({ queryKey: [, queryParams], pageParam }: QueryFunctionContext<QueryKey>) =>
  countries
    .get<CountriesListApiResponse>('/countries', {
      params: {
        page: pageParam,
        per_page: queryParams.query.replace('.', '') ? 999 : 16,
        continent: queryParams.continent || undefined,
      },
    })
    .then(res => res.data)
    .then(res => ({
      ...res,
      data: res.data.filter(country => {
        let regex = RegExp(queryParams.query, 'i');

        if (queryParams.query.startsWith('.')) {
          regex = RegExp(queryParams.query.slice(1), 'i');

          return regex.test(country.iso2);
        }

        return regex.test(country.full_name);
      }),
    }));

export const useCountriesInfiniteQuery = (continent: Continent, query: string) =>
  useInfiniteQuery({
    queryKey: queryKey({ continent, query }),
    queryFn,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta?.current_page === lastPage.meta?.last_page) return;
      if (lastPage.meta?.current_page) return lastPage.meta.current_page + 1;

      return allPages[allPages.length - 1]?.meta?.current_page;
    },

    refetchOnWindowFocus: false,
    staleTime: 60000,
    initialPageParam: 1,
  });

useCountriesInfiniteQuery.queryKey = queryKey;
useCountriesInfiniteQuery.queryFn = queryFn;
