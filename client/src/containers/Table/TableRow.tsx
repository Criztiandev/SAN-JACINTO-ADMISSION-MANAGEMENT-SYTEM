/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { flexRender } from "@tanstack/react-table";

const TableRow = ({ row, layout }: any) => {
  const { getVisibleCells } = row;
  return (
    <motion.div
      key={row.id}
      className={`relative grid items-center justify-items-center border-b`}
      style={{ gridTemplateColumns: layout }}>
      {getVisibleCells().map(
        ({ id, column, getContext }: any, index: number) => (
          <span
            key={id}
            className={`px-4 py-2 text-sm font-light ${
              index === 0 && "left-0 z-10 p-0 w-full h-full bg-[#f9fafb]"
            }`}
            style={{
              position: index === 0 ? "sticky" : "relative",
            }}>
            {flexRender(column.columnDef.cell, getContext())}
          </span>
        )
      )}
    </motion.div>
  );
};

export default TableRow;
