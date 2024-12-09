"use client";

import { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

import { Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { InputGroup } from "./ui/input-group";

import { useQueryParams, useDebounce } from "@/hooks";

const Search = () => {
  const { createQueryParams, getQueryParam, updateQueryParams } =
    useQueryParams();

  const [searchTerm, setSearchTerm] = useState(getQueryParam("query") ?? "");

  const debouncedTerm = useDebounce(searchTerm);

  const [placeholder] = useTypewriter({
    words: ["name (ex: Egypt)", "top level domain (ex: .eg)"],
    loop: 0,
  });

  useEffect(() => {
    updateQueryParams(createQueryParams("query", debouncedTerm));
  }, [debouncedTerm]);

  return (
    <InputGroup startElement={<IoSearch />} w="full">
      <Input
        name="query"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        defaultValue={getQueryParam("query") ?? ""}
        placeholder={`Search for a country by ${placeholder}`}
        bgColor={{ _dark: "dark.elements", _light: "light.elements" }}
        _selection={{ color: "purple.800" }}
        variant="outline"
        fontSize="md"
        h="14"
        w={["full", null, "50%"]}
        minW={["unset", null, "lg"]}
      />
    </InputGroup>
  );
};

export default Search;
