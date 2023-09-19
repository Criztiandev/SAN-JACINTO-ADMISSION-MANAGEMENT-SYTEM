import SearchBar from "../../components/SearchBar";
import { useTableContext } from "../../context/TableContext";
import { useRef, ChangeEvent } from "react";

const TableSearchBar = () => {
  const { search, dispatch } = useTableContext();
  const searchbarRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch({ type: "SET_FILTER_SELECT", payload: "Filter" });
    dispatch({ type: "SET_FILTER", payload: value });
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  return (
    <SearchBar ref={searchbarRef} value={search} onChange={handleChange} />
  );
};

export default TableSearchBar;
