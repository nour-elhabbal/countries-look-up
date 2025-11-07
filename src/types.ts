export type QueryParamsType = 'region' | 'query';

export interface ApiError {
  status: number;
  message: string;
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Polar' | 'Antarctic' | '';

// export interface Country {
//   name: string;
//   full_name: string;
//   capital: string;
//   population: string;
//   continent: string;
//   iso2: string;
//   currency: string;
//   href: {
//     flag: string;
//     self: string;
//   };
// }

export interface CountriesListApiResponse {
  data: Country[];
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

export interface QueryParams {
  region: Region;
  query: string;
}

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    [key: string]: string;
  };
  flag: string;
  regionalBlocs: {
    acronym: string;
    name: string;
  }[];
  cioc: string;
  independent: boolean;
}
