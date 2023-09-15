/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext,
  createContext,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  Table,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { BaseProps } from "../interface/componentInterface";

interface TableProviderProps extends BaseProps {
  data: any[]; // Change this to the appropriate type for your data
  config: any[]; // Change this to the appropriate type for your config
  layout: string;
}

interface TableContextValue {
  table: Table<any>; // Change this to the appropriate type for your data
  filter: string;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  setFilter: (value: string) => void;
  tableLayout: string;
  setTableLayout: (value: string) => void;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export const useTableContext = (): TableContextValue => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");
  return context;
};

const TableProvider = ({
  data,
  config,
  children,
  layout,
}: TableProviderProps) => {
  const [filter, setFilter] = useState<string>("");
  const memoizedData = useMemo(() => data, [data]);
  const [tableLayout, setTableLayout] = useState(layout);

  // Filter Configuration

  // Table Configuration
  const table = useReactTable({
    data: memoizedData,
    columns: config,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: (value: string) => setFilter(value),
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const value: TableContextValue = {
    table,
    filter,
    handleFilter: handleFilterChange,
    setFilter,
    tableLayout,
    setTableLayout,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
