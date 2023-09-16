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

  setFilter: (value: string) => void;
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;

  tableLayout: string;
  setTableLayout: (value: string) => void;

  rowSelection: any;
  setRowSelection: any;

  handleAcceptApplicant: (value: number | Array<number>) => void;
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
  const [rowSelection, setRowSelection] = useState({});
  const [filter, setFilter] = useState<string>("");
  const memoizedData = useMemo(() => data, [data]);
  const [tableLayout, setTableLayout] = useState(layout);

  // Table Configuration
  const table = useReactTable({
    data: memoizedData,
    columns: config,

    state: {
      globalFilter: filter,
      rowSelection: rowSelection,
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: (value: string) => setFilter(value),

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    debugTable: true,
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const handleAcceptApplicant = (value: number | Array<number>) => {
    if (Array.isArray(value)) {
      const applicants = value.map((id: number) => memoizedData[id]);
      console.log(applicants);
      return;
    }

    console.log(memoizedData[value]);
  };

  const value: TableContextValue = {
    table,
    filter,

    setFilter,
    handleFilter: handleFilterChange,

    tableLayout,
    setTableLayout,

    rowSelection,
    setRowSelection,

    handleAcceptApplicant,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
