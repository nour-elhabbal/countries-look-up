import { Country } from '@/types';

export const getCountryDetails = async (domain: string): Promise<Country | undefined> => {
  try {
    console.log(`https://www.apicountries.com/alpha/${domain}`);
    const res: Country = await fetch(`https://www.apicountries.com/alpha/${domain}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    }).then(res => res.json());

    return res;
  } catch (err) {
    console.log('Error fetching country details:', err);
    return undefined;
  }
};
