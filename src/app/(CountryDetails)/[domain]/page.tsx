import { getCountryDetails } from "@/utils/getCountry";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { notFound } from "next/navigation";

interface CountryDetailsProps {
  params: Promise<{
    domain: string;
  }>;
}

const CountryDetails = async ({ params }: CountryDetailsProps) => {
  const { domain } = await params;
  console.log(domain);

  const country = await getCountryDetails(domain);

  if (!country) notFound();

  return (
    <Flex direction="column" gap="10">
      <Box>Back btn</Box>
      <Flex>
        <Box>Flag</Box>

        <Flex>
          <Heading>{country.name}</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CountryDetails;
