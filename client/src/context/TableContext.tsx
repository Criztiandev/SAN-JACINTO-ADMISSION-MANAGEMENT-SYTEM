/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import { BaseProps } from "../interface/componentInterface";
import { useQuery } from "react-query";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  OnChangeFn,
} from "@tanstack/react-table";
import ApplicantData from "../data/applicantData.json";
import { TableValue } from "../interface/Table.types";

const TableContext = createContext<TableValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");
  return context;
};

const TableProvider = ({ children }: BaseProps) => {
  const query = useQuery({});
  const data = ApplicantData;
  const memoizedData: any = useMemo(() => data, [data]);

  const [selected, setSelected] = useState<object | string>({});
  const [tableConfig, setTableConfig] = useState([]);

  const [search, setSearch] = useState<string | number>("");
  const [columnSearch, setColumnSearch] = useState<ColumnFiltersState>([]);
  const [sort, setSort] = useState<SortingState | undefined>();
  const [rowSelect, setRowSelect] = useState({});

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const handleSelected = (data: string | object) => {
    setSelected(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleColumnSearch = (filter: any) => {
    setColumnSearch(prev => [{ ...prev, ...filter }]);
  };

  const table = useReactTable({
    data: memoizedData,
    columns: tableConfig,

    state: {
      rowSelection: rowSelect,
      sorting: sort,
      globalFilter: search,
      columnFilters: columnSearch,
    },

    onRowSelectionChange: setRowSelect,
    onSortingChange: setSort as OnChangeFn<SortingState>,
    onGlobalFilterChange: setSearch,
    onColumnFiltersChange: setColumnSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const value = {
    table,
    ...query,
    selected,
    search,
    columnSearch,

    handleSearch,
    handleSelected,
    handleColumnSearch,
    setTableConfig,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
