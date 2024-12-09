import type { Continent, CountriesListApiResponse, Country } from "@/types";

interface ResponseType {
  data: Country[];
  links?: CountriesListApiResponse["links"];
  error?: CountriesListApiResponse["error"];
  meta?: CountriesListApiResponse["meta"];
}

export const getCountriesList = async (
  urlParams: { continent: Continent; query: string },
  pageNumber: number = 1,
  itemsPerPage: number = 16
): Promise<
  | {
      countries: Country[];
      links?: CountriesListApiResponse["links"];
      error?: CountriesListApiResponse["error"];
      meta?: CountriesListApiResponse["meta"];
    }
  | undefined
> => {
  let res: ResponseType;

  if (urlParams.continent) {
    res = await fetch(
      `https://restfulcountries.com/api/v1/countries?page=${pageNumber}&per_page=${
        urlParams.query?.length > 2 ? 999 : itemsPerPage
      }&continent=${urlParams?.continent}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: process.env
            .NEXT_PUBLIC_COUNTRIES_LIST_API_TOKEN as string,
        },
        next: { revalidate: 604800 },
      }
    ).then((res) => res.json());
  } else {
    res = await fetch(
      `https://restfulcountries.com/api/v1/countries?page=${pageNumber}&per_page=${
        urlParams.query?.length > 1 ? 999 : itemsPerPage
      }`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: process.env
            .NEXT_PUBLIC_COUNTRIES_LIST_API_TOKEN as string,
        },
        next: { revalidate: 604800 },
      }
    ).then((res) => res.json());
  }

  if (urlParams.query) {
    let regex = RegExp(urlParams.query as string, "i");

    return {
      countries: res.data.filter((country) => {
        if (urlParams.query.startsWith(".")) {
          regex = RegExp(urlParams?.query.slice(1), "i");

          return regex.test(country.iso2);
        }

        return regex.test(country.full_name);
      }),

      links: res.links,
      meta: res.meta,
      error: res.error,
    };
  }

  return {
    countries: res.data,
    links: res.links,
    error: res.error,
    meta: res.meta,
  };
};
