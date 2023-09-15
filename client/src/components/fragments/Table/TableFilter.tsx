/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, MouseEvent } from "react";
import Dropdown from "../../Dropdown";
import FilterIcon from "../../../assets/icons/Filter.svg";
import Button from "../../Button";
import { useTableContext } from "../../../context/TableContext";

interface FilterProps {
  lists: any[];
}

const TableFilter = ({ lists }: FilterProps) => {
  const [select, setSelect] = useState<string>("");
  const { setFilter } = useTableContext();

  const handleSelection = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.name;
    setSelect(target);
    setFilter("Kruger");
  };

  return (
    <Dropdown
      className="min-w[137px]"
      title={select ? select : "Filter"}
      as="button"
      icon={FilterIcon}
      type="outlined">
      {lists.map(item => (
        <Button
          key={item.title}
          type="unstyled"
          className="w-full"
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
