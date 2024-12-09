import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import type { Country } from "@/types";

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <Box
      w="20%"
      h="21em"
      my="6"
      minW={["280px", "250px"]}
      bgColor={{ _dark: "dark.elements", _light: "light.elements" }}
      borderRadius="md"
    >
      <Box h="50%" w="100%" mb="5" borderRadius="md">
        <Image
          src={country.href.flag}
          width={500}
          height={295}
          alt="flag"
          style={{ borderRadius: "inherit" }}
        />
      </Box>

      <Heading fontSize="lg" mx="4" mb="3">
        {country.name}
      </Heading>

      <Box mx="4" fontSize="sm">
        <Text>
          Population:{" "}
          <Box as="span" fontWeight="thin" opacity=".8">
            {country.population}
          </Box>
        </Text>

        <Text>
          Continent:{" "}
          <Box as="span" fontWeight="thin" opacity=".8">
            {country.continent}
          </Box>
        </Text>

        <Text>
          Capital:{" "}
          <Box as="span" fontWeight="thin" opacity=".8">
            {country.capital}
          </Box>
        </Text>
      </Box>
    </Box>
  );
};

export default CountryCard;
