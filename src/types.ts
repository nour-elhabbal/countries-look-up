export type QueryParamsType = "continent" | "query";

export type Continent =
  | "Asia"
  | "Africa"
  | "Europe"
  | "Oceana"
  | "Australia"
  | "North America"
  | "South America";

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
  error?: {
    status: number;
    message: string;
  };
}
