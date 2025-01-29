"use client";

import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { useCountriesInfiniteQuery, useQueryParams } from "@/hooks";
import type { Continent, QueryParamsType } from "@/types";

import CountryCard from "./CountryCard";
import CountryCardSkeleton from "./CountryCardSkeleton";
import { useEffect } from "react";

const CountriesList = () => {
  const { ref, inView } = useInView();

  const { getQueryParam } = useQueryParams();
  const query = getQueryParam<QueryParamsType>("query") ?? "";
  const continent = (getQueryParam<QueryParamsType>("continent") ??
    "") as Continent;

  const countriesInfiniteQuery = useCountriesInfiniteQuery(continent, query);

  const shouldFetchNextPage =
    countriesInfiniteQuery.hasNextPage &&
    !countriesInfiniteQuery.isFetchingNextPage;

  useEffect(() => {
    if (inView) countriesInfiniteQuery.fetchNextPage();
  }, [inView]);

  if (countriesInfiniteQuery.error)
    return (
      <Flex
        w="full"
        justify="center"
        color="red.500"
        fontWeight="bold"
        fontSize="md"
      >
        Error: {countriesInfiniteQuery.error?.message}
      </Flex>
    );

  if (countriesInfiniteQuery.isPending) {
    return (
      <Flex flexWrap="wrap" justify="space-around" gap="5">
        {[...Array(16)].map((_, i) => (
          <CountryCardSkeleton key={`SKELETON ${i}`} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex direction="column" px="5">
      <Flex flexWrap="wrap" justify="space-around" gap="12" w="full">
        {countriesInfiniteQuery.data.pages.map((page) =>
          page.data?.map((country) => (
            <CountryCard key={country.iso2} country={country} />
          ))
        )}
      </Flex>

      {countriesInfiniteQuery.isFetchingNextPage && (
        <Flex
          w="full"
          justify="center"
          align="center"
          h="20"
          direction="column"
        >
          <Spinner size="xl" color="purple.400" />
          <Text>Loading</Text>
        </Flex>
      )}

      {shouldFetchNextPage && <Box ref={ref} h="2" w="10" mt="5" />}
    </Flex>
  );
};

export default CountriesList;
