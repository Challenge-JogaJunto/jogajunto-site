import { createContext, useContext } from "react";

export const SearchContext = createContext();

export default function useSearch() {
  return useContext(SearchContext);
}
