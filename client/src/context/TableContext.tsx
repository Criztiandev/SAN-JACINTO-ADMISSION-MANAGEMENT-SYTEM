/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useMemo } from "react";
import {
  TableOptions,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface ApplicantData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  university: string;
}

interface TableProviderProps {
  payload: ApplicantData[]; // Corrected payload type
  header: ColumnDef<ApplicantData>[]; // Corrected headers type
  children: ReactNode;
}

const TableContext = createContext<TableOptions<ApplicantData> | null>(null); // Define the context with the correct type
export const useTableConfig = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableConfig must be used within a TableProvider");
  }
  return context;
};

const TableProvider = ({ payload, header, children }: TableProviderProps) => {
  const data = useMemo(() => payload, [payload]);
  const columns: ColumnDef<ApplicantData>[] = useMemo(() => header, [header]);

  const tableOptions: TableOptions<ApplicantData> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  };

  return (
    <TableContext.Provider value={tableOptions}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
