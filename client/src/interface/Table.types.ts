/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseQueryResult } from "react-query";
import { ColumnFiltersState, TableOptions } from "@tanstack/react-table";
import { ChangeEvent } from "react";

export interface TableValue {
  table: TableOptions<any>;
  query: UseQueryResult<any>;
  selected: object | string;
  search: string;
  columnSearch: ColumnFiltersState;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelected: (data: string | object) => void;
  handleColumnSearch: (filter: any) => void;
  setTableConfig: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ColumnFilterProps {
  id: string;
  value: string | number;
}
