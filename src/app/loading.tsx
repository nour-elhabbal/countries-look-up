import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex w="full" h="60vh" justify="center" align="center" fontSize="4xl">
      <Spinner
        color="blue.500"
        borderWidth="4px"
        size="xl"
        css={{ "--spinner-track-color": "colors.red.500" }}
      />
    </Flex>
  );
};

export default Loading;
