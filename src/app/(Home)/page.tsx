import { Box, Flex } from "@chakra-ui/react";

import CountriesList from "./components/CountriesList";
import FiltersMenu from "@/components/FiltersMenu";
import Search from "../../components/Search";

const Home = async () => {
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

        <CountriesList />
      </Box>
    </>
  );
};

export default Home;
