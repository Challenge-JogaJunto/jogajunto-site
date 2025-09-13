import { useNavigate } from "react-router-dom";
import { SearchContext } from "../hooks/useSearch";
import { useState } from "react";

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const initialSearch = searchParams.get("s") || "";

  if (initialSearch && !search) {
    setSearch(initialSearch);
  }

  const navigate = useNavigate();

  const makeSearch = () => {
    if (search.trim().length < 3) return;
    navigate(`/search?s=${search}`);
  };
  return (
    <SearchContext.Provider value={{ makeSearch, search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
