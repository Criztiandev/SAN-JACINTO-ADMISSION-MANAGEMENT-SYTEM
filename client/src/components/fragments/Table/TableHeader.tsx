/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTableContext } from "../../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableHeader = () => {
  const { table, tableLayout } = useTableContext();
  const { getHeaderGroups } = table;
  return (
    <>
      {getHeaderGroups().map(row => (
        <div
          className={`relative grid grid-cols-[${tableLayout}]`}
          key={row.id}>
          {row.headers.map((title, index) => (
            // get the first and second column to separate the rest
            <div
              key={title.id}
              className={`sticky top-0 w-full p-4 text-center bg-[#cccccc] border-b ${
                index === 0 && "sticky top-0 left-0 z-10 border-r-[#1e1e1e]"
              }`}
              onClick={title.column.getToggleSortingHandler()}>
              {flexRender(title.column.columnDef.header, title.getContext())}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default TableHeader;
