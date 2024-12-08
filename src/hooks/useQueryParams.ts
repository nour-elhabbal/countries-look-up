import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryParams = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value.toString());
      } else {
        params.delete(name);
      }

      return `?${params.toString()}`;
    },
    [searchParams]
  );

  const updateQueryParams = (param: string) => {
    router.replace(`${pathname}${param}`);
  };

  return {
    createQueryParams,

    updateQueryParams,

    getQueryParam: <T>(param: T) => searchParams.get(param as string),
  };
};