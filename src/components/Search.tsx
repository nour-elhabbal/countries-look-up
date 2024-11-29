"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Box, Input } from "@chakra-ui/react";

import { useDebounce } from "@/hooks/useDebounce";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    debouncedTerm ? params.set("query", debouncedTerm) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedTerm]);

  return (
    <Box>
      <Input
        name="query"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </Box>
  );
};

export default Search;
