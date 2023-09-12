import { useTableConfig } from "../../../context/TableContext";
import { useReactTable, flexRender } from "@tanstack/react-table";

const TableContent = () => {
  const config = useTableConfig();
  const { getRowModel } = useReactTable(config);
  const { rows } = getRowModel();
  return (
    <tbody className="w-full flex justify-between flex-col ">
      {rows.map(row => (
        <tr
          key={row.id}
          className="w-full grid grid-cols-[30px_200px_auto_auto] items-center gap-4 border-b border-s border-r py-3 px-6">
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className=" justify-self-start max-w">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
