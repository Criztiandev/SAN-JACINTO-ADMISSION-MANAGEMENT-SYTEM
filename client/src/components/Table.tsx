/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  AccessorFn,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { applicantData } from "../data/applicantData";
import { useMemo } from "react";
import { DateFormat } from "../helper/dateHelper";

// {
//     id: 89,
//     first_name: "Ernestus",
//     last_name: "Hardiker",
//     email: "ehardiker2g@twitpic.com",
//     gender: "Male",
//     dob: "2022-11-26T01:03:59Z",
//   },

interface TableColumnConfig<TData, TValue> {
  header: string;
  accessorKey?: keyof TData;
  accessorFn?: AccessorFn<TData, TValue>;
  cell?: (info: { getValue: () => any }) => string;
}

const Table = () => {
  const config: TableColumnConfig<any, any>[] = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Name",
      accessorFn: ({ first_name, last_name }: any) =>
        `${first_name} ${last_name}`,
    },
    { header: "Email", accessorKey: "email" },
    { header: "Gender", accessorKey: "gender" },
    {
      header: "Date",
      accessorKey: "dob",
      cell: ({ getValue }: any) => DateFormat(getValue()),
    },
  ];

  const memoizedData = useMemo(() => applicantData, []);

  const { getHeaderGroups, getRowModel } = useReactTable<any>({
    data: memoizedData,
    columns: config,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <table>
        {getHeaderGroups().map(row => (
          <tr key={row.id}>
            {row.headers.map(header => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}

        <tbody>
          {getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
