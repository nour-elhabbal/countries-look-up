import { Box, Flex } from "@chakra-ui/react";

import CountriesList from "./components/CountriesList";
import FiltersMenu from "@/components/FiltersMenu";
import Search from "../../components/Search";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCountriesList } from "@/utils";
import { Continent } from "@/types";

interface HomeProps {
  searchParams: Promise<{
    continent: Continent;
    query: string;
  }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { continent = "", query = "" } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "countries",
      continent,
      query[query.length - 1] === "." ? "" : query,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      return getCountriesList(
        {
          continent,
          query,
        },
        pageParam
      );
    },
  });

  return (
    <>
      <Box>
        <Flex
          direction={["column", null, "row"]}
          align={["start", null, "center"]}
          justify="space-between"
          gapY="3"
          mx={["2", "8"]}
          my="10"
        >
          <Search />

          <FiltersMenu />
        </Flex>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CountriesList />
        </HydrationBoundary>
      </Box>
    </>
  );
};

export default Home;
