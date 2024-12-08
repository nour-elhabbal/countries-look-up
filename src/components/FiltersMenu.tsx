"use client";

import { useEffect, useState } from "react";

import { Box, Button, Text } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { Continent } from "@/types";
import { useQueryParams } from "@/hooks";

const FiltersMenu = () => {
  const { createQueryParams, updateQueryParams, getQueryParam } =
    useQueryParams();

  const [selectedContinent, setSelectedContinent] = useState(
    getQueryParam("continent") ?? ""
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const continents: Continent[] = [
    "North America",
    "South America",
    "Australia",
    "Oceana",
    "Africa",
    "Europe",
    "Asia",
  ];

  useEffect(() => {
    updateQueryParams(createQueryParams("continent", selectedContinent));
  }, [selectedContinent]);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          display="flex"
          justifyContent="space-between"
          bgColor="dark.elements"
          variant="plain"
          w="52"
          h="14"
        >
          <Text>{selectedContinent || "Filter by continent"}</Text>

          <Box>{isMenuOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</Box>
        </Button>
      </MenuTrigger>

      <MenuContent bgColor="dark.elements" w="52">
        {continents.map((continent, i) => {
          return (
            <MenuItem
              bgColor={selectedContinent === continent ? "dark.bg" : "unset"}
              value={continent.toLowerCase()}
              key={`menu item ${i}`}
              onClick={() => {
                setSelectedContinent((prev) =>
                  prev === continent ? "" : continent
                );
              }}
            >
              {continent}
            </MenuItem>
          );
        })}
      </MenuContent>
    </MenuRoot>
  );
};

export default FiltersMenu;
