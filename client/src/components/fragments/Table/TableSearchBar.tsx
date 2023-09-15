import SearchBar from "../../SearchBar";
import { useTableContext } from "../../../context/TableContext";
import { useState, useEffect, useRef, ChangeEvent } from "react";

const TableSearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const { setFilter } = useTableContext();
  const searchbarRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setFilter(value);
  };

  // When the user clicks outside, it will return an empty string
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target as Node)
      ) {
        setSearch("");
        setFilter(""); // Clear the filter
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setFilter]);

  return (
    <SearchBar ref={searchbarRef} value={search} onChange={handleChange} />
  );
};

export default TableSearchBar;
