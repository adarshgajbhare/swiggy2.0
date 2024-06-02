import { Children, createContext, useEffect, useState } from "react";

const SearchContext = createContext({
  search: "",
  setSearch: () => {},
});

export const SearchProvider = ({ children }) => {
  // Corrected prop name to 'childr
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
