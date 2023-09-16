/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTableContext } from "../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableHeader = () => {
  const { table, tableLayout } = useTableContext();
  const { getHeaderGroups } = table;
  return (
    <>
      {getHeaderGroups().map(row => (
        <div
          className={`sticky top-0 z-30`}
          style={{ display: "grid", gridTemplateColumns: `${tableLayout}` }}
          key={row.id}>
          {row.headers.map((title, index) => (
            <div
              key={title.id}
              className={`w-full p-4 text-center bg-[#cccccc] border-b ${
                index === 0 ? "sticky left-0 z-30 border-r-[#1e1e1e]" : ""
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
