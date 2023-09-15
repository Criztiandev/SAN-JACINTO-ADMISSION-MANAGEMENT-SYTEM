/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTableContext } from "../../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableHeader = () => {
  const { table } = useTableContext();
  const { getHeaderGroups } = table;

  return (
    <>
      {getHeaderGroups().map(row => (
        <>
          {row.headers.map((title, index) => (
            // get the first and second column to separate the rest
            <div
              className={`sticky top-0 w-full p-4 text-center bg-[#cccccc] border-b ${
                index === 0 && "sticky top-0 left-0 z-10"
              }`}
              key={title.id}
              onClick={title.column.getToggleSortingHandler()}>
              {flexRender(title.column.columnDef.header, title.getContext())}
            </div>
          ))}
        </>
      ))}
    </>
  );
};

export default TableHeader;
