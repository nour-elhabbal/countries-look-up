'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryParams = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value.toString());
      } else {
        params.delete(name);
      }
      const queryString = params.toString();
      return queryString ? `?${params.toString()}` : '';
    },
    [searchParams]
  );

  const updateQueryParams = (param: string) => {
    window.history.replaceState(null, '', `${pathname}${param}`);
  };

  return {
    createQueryParams,

    updateQueryParams,

    getQueryParam: <T>(param: T) => searchParams.get(param as string),
  };
};
