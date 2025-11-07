import axios from 'axios';

const getBaseURL = () => {
  if (typeof window === 'undefined') {
    // We’re on the server
    const vercelUrl = process.env.VERCEL_URL; // set automatically in prod
    const localUrl = 'http://localhost:3000'; // your local dev URL

    return vercelUrl ? `https://${vercelUrl}/api/countries` : `${localUrl}/api/countries`;
  }

  // We’re on the client
  return '/api/countries';
};

export const countries = axios.create({
  baseURL: getBaseURL(),
});
