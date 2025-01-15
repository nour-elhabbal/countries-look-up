import {
  GetCountryDetailsReturnType,
  CountryDetailsApiResponse,
} from "@/types";

// KOSOM DA API EBN ZANYA

export const getCountryDetails = async (
  domain: string
): Promise<GetCountryDetailsReturnType | undefined> => {
  try {
    const res: CountryDetailsApiResponse[] = await fetch(
      `https://restcountries.com/v3.1/alpha/${domain}`,
      {
        next: { revalidate: 604800 },
      }
    ).then((res) => res.json());

    let {
      borders,
      capital,
      cca2,
      currencies,
      languages,
      name,
      population,
      region,
      subregion,
    } = res[0];

    const borderCountries: CountryDetailsApiResponse[] = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borders}`,
      {
        next: { revalidate: 604800 },
      }
    ).then((res) => res.json());

    return {
      currencies: Object.keys(currencies).map((key) => currencies[key].name),

      languages: Object.keys(languages).map((key) => languages[key]),

      nativeName: name.nativeName[Object.keys(languages)[0]].common,

      name: name.common,

      borders: borderCountries.map((country) => ({
        cca2: country.cca2,
        name: country.name.common,
      })),

      capitals: capital,
      population,
      subregion,
      region,
      cca2,
    };
  } catch (err) {
    console.log(err);

    return undefined;
  }
};
