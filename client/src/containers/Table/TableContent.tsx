import Typography from "../../components/Typography";
import { useTableContext } from "../../context/TableContext";
import { flexRender } from "@tanstack/react-table";

const TableContent = () => {
  const { table, tableLayout } = useTableContext();
  const { getRowModel } = table;
  return (
    <>
      {getRowModel().rows.map(row => (
        <div
          key={row.id}
          style={{
            display: "grid",
            gridTemplateColumns: `${tableLayout}`,
            alignItems: "center",
            justifyItems: "center",
          }}>
          {row.getVisibleCells().map((cell, index) => (
            <Typography
              as="span"
              key={cell.id}
              className={`w-full h-full  text-[14px]  bg-white border-b py-1 ${
                index === 0
                  ? "sticky left-0 border-r justify-start"
                  : "justify-center "
              } flex items-center`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Typography>
          ))}
        </div>
      ))}
    </>
  );
};

export default TableContent;
