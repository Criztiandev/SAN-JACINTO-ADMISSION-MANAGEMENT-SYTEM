/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, useRef } from "react";
import Dropdown from "../../components/Dropdown";
import FilterIcon from "../../assets/icons/Filter.svg";
import Button from "../../components/Button";
import { useTableContext } from "../../context/TableContext";

interface FilterProps {
  lists: any[];
}

const TableFilter = ({ lists }: FilterProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { filterSelect, dispatch } = useTableContext();

  const handleSelection = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.name;

    if (target === "Default") {
      dispatch({ type: "SET_FILTER", payload: "" });
      dispatch({ type: "SET_FILTER_SELECT", payload: "Filter" });
    } else {
      dispatch({ type: "SET_FILTER", payload: target.toLowerCase() });
      dispatch({ type: "SET_FILTER_SELECT", payload: target });
      dispatch({ type: "SET_SEARCH", payload: "" });
    }
  };

  return (
    <Dropdown
      className="z-50 min-w-[150px]"
      title={filterSelect ? filterSelect : "Filter"}
      as="button"
      icon={FilterIcon}
      type="outlined">
      {lists.map(item => (
        <Button
          ref={buttonRef}
          key={item.title}
          type="ghost"
          dir="left"
          icon={item.icon}
          title={item.title}
          name={item.title}
          onClick={handleSelection}
        />
      ))}
    </Dropdown>
  );
};

export default TableFilter;
