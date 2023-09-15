import { useTableContext } from "../../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableContent = () => {
  const { table, tableLayout } = useTableContext();
  const { getRowModel } = table;
  return (
    <div className={`grid grid-rows-1 border`}>
      {getRowModel().rows.map(row => (
        <div className={`grid grid-cols-[${tableLayout}]`}>
          {row.getVisibleCells().map((cell, index) => (
            <span
              key={cell.id}
              className={`w-full p-4 text-center bg-white border-b ${
                index === 0 && "sticky left-0 border-r text-left"
              }`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableContent;
