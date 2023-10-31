/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnFiltersState, TableOptions } from "@tanstack/react-table";
import { ChangeEvent } from "react";
import { ToggleProps } from "./Drawer.Types";

export interface TableValue {
  tableData: Array<object> | Array<any>;
  table: TableOptions<any>;
  selected: object | string;
  search: string;
  columnSearch: ColumnFiltersState;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelected: (data: string | object) => void;
  handleColumnSearch: (filter: any) => void;
  setTableConfig: React.Dispatch<React.SetStateAction<any[]>>;
  handleMutateData: (data: Array<object>) => void;
}

export interface ColumnFilterProps {
  id: string;
  value: string | number;
}

export interface TableConfigProps {
  toggles: ToggleProps | object | any;
  onToggle: (id: string, toggle: () => void) => void;
  onAccept: (id: string, status: string) => void;
  action?: boolean;
}
