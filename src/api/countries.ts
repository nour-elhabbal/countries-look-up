import axios from "axios";

export const countries = axios.create({
  baseURL: "https://restfulcountries.com/api/v1",
  headers: {
    Accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_COUNTRIES_LIST_API_TOKEN,
  },
});
