import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import Link from "next/link";

const Header = () => {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={["4", "14", "16"]}
      py="5"
      _dark={{ bgColor: "dark.elements" }}
      _light={{ bgColor: "light.elements" }}
    >
      <Box fontWeight="800" fontSize={["md", "2xl", "3xl"]}>
        <Link href="/">Where in the world?</Link>
      </Box>

      <Box>
        <ColorModeButton
          size={["md", "lg"]}
          fontWeight="700"
          _hover={{ cursor: "pointer", bgColor: "unset" }}
          _dark={{ _after: { content: '"Dark mode"' } }}
          _light={{ _after: { content: '"Light mode"' } }}
        />
      </Box>
    </Flex>
  );
};

export default Header;
