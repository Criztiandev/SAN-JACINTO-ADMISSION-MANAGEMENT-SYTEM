/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import { BaseProps } from "../interface/Common.Types";

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
  const [tableData, setTableData] = useState<Array<object>>([]);

  const [tableConfig, setTableConfig] = useState([]);

  const [search, setSearch] = useState<string | number>("");
  const [columnSearch, setColumnSearch] = useState<ColumnFiltersState>([
    { id: "studentDetails.yearLevel", value: "Grade 11" },
  ]);
  const [sort, setSort] = useState<SortingState | undefined>();
  const [rowSelect, setRowSelect] = useState({});

  const memoizedData: any = useMemo(() => tableData, [tableData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleColumnSearch = (filter: any) => {
    setColumnSearch((prev) => [{ ...prev, ...filter }]);
  };

  const handleMutateData = (data: Array<object>) => setTableData(data);

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

  const value: any = {
    tableData: memoizedData,
    table,
    search,
    columnSearch,

    handleSearch,
    handleColumnSearch,
    setTableConfig,
    handleMutateData,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
