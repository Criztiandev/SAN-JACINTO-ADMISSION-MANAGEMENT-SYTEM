/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { ColumnFilterProps } from "../interface/Table.types";

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option?: any;
}

const useTable = ({ option = {} }: TableProps) => {
  const query = useQuery(option);

  const [selected, setSelected] = useState<object | string>({});
  const [search, setSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<ColumnFilterProps[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const handleSelected = (data: string | object) => {
    setSelected(data);
  };

  const handleColumnSearch = (filter: any) => {
    setColumnSearch(prev => [{ ...prev, ...filter }]);
  };

  return {
    ...query,
    selected,
    handleSelected,
    columnSearch,
    handleColumnSearch,

    search,
    handleSearch,
  };
};

export default useTable;
