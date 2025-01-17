export type QueryParamsType = "continent" | "query";

export interface ApiError {
  status: number;
  message: string;
}

export type Continent =
  | "Asia"
  | "Africa"
  | "Europe"
  | "Oceana"
  | "Australia"
  | "North America"
  | "South America"
  | "";

export interface Country {
  name: string;
  full_name: string;
  capital: string;
  population: string;
  continent: string;
  iso2: string;
  currency: string;
  href: {
    flag: string;
    self: string;
  };
}

export interface CountriesListApiResponse {
  countries: Country[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: string;
    to: number;
    total: number;
  };
  error?: ApiError;
}

export interface CountryDetailsApiResponse {
  name: {
    common: string;

    nativeName: {
      [language: string]: { common: string };
    };
  };

  currencies: {
    [currency: string]: { name: string };
  };

  languages: {
    [language: string]: string;
  };

  region: string;

  cca2: string;

  population: number;

  subregion: string;

  capital: string[];

  borders: string[];
}

export interface GetCountryDetailsReturnType {
  borders: { name: string; cca2: string }[] | undefined;

  currencies: string[];

  languages: string[];

  capitals: string[];

  nativeName: string;

  name: string;

  region: string;

  cca2: string;

  subregion: string;

  population: number;
}
