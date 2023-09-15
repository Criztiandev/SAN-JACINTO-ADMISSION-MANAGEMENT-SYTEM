import { useTableContext } from "../../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableContent = () => {
  const { table } = useTableContext();
  const { getRowModel } = table;
  return (
    <>
      {getRowModel().rows.map(row => (
        <>
          {row.getVisibleCells().map((cell, index) => (
            <span
              key={cell.id}
              className={`w-full p-4 text-center bg-white border-b ${
                index === 0 && "sticky left-0 border-r text-left"
              }`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          ))}
        </>
      ))}
    </>
  );
};

export default TableContent;
