"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Manga } from "../lib/definitions";

interface SearchContextProps {
  searchResults: Manga[];
  setSearchResults: (results: Manga[]) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Manga[]>([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
