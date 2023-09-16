/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useReducer } from "react";
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
  search: string;
  filterSelect: string;
  tableLayout: string;
  rowSelection: any;
  handleAcceptApplicant: (value: number | Array<number>) => void;
  dispatch: React.Dispatch<Action>;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

const initialState = {
  filter: "",
  search: "",
  filterSelect: "",
  rowSelection: {},
};

type Action =
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_ROW_SELECT"; payload: any }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_FILTER_SELECT"; payload: string }
  | { type: "SET_TABLE_LAYOUT"; payload: string };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_ROW_SELECT":
      return { ...state, rowSelection: action.payload };

    case "SET_FILTER_SELECT":
      return { ...state, filterSelect: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_TABLE_LAYOUT":
      return { ...state, tableLayout: action.payload };

    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoizedData = useMemo(() => data, [data]);

  // Table Configuration
  const table = useReactTable({
    data: memoizedData,
    columns: config,
    state: {
      globalFilter: state.filter,
      rowSelection: state.rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onGlobalFilterChange: (value: string) =>
      dispatch({ type: "SET_FILTER", payload: value }),
    enableRowSelection: true,

    onRowSelectionChange: (newSelection: any) =>
      dispatch({ type: "SET_ROW_SELECT", payload: newSelection }),
    debugTable: true,
  });

  const handleAcceptApplicant = (value: number | Array<number>) => {
    if (Array.isArray(value)) {
      const applicants = value.map((id: number) => memoizedData[id]);
      console.log(applicants);
      return;
    }
    console.log(memoizedData[value]);
  };

  const value: TableContextValue = {
    ...state,
    table,
    handleAcceptApplicant,
    dispatch,
    tableLayout: layout,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
