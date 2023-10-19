/* eslint-disable @typescript-eslint/no-explicit-any */

import PrevIcon from "../assets/icons/Expand_left_light.svg";
import NextIcon from "../assets/icons/Expand_right_light.svg";
import AscIcon from "../assets/icons/Expand_up_light.svg";
import DescIcon from "../assets/icons/Expand_down_light.svg";
import { IconButton, Typography, Image } from ".";
import { motion } from "framer-motion";
import { flexRender } from "@tanstack/react-table";
import { useTableContext } from "../context/TableContext";

const sortingIcons: any = {
  asc: <Image className="w-5 h-5" src={AscIcon} alt="asc_icon" />,
  desc: <Image className="w-5 h-5" src={DescIcon} alt="desc_icon" />,
};

interface TableProps {
  layout: string;
}

const Table = ({ layout }: TableProps) => {
  const { table } = useTableContext();
  return (
    <>
      <motion.div className="relative border overflow-scroll rounded-[5px] xl:h-[54vh] 2xl:h-[61vh] ">
        {table.getHeaderGroups().map(({ id, headers }) => (
          <div key={id}>
            {/* Header */}
            <div
              className={`grid items-center justify-items-center sticky top-0 z-20`}
              style={{ gridTemplateColumns: layout }}>
              {headers.map(
                ({ id, column, getContext, isPlaceholder }, index) => {
                  const sorting = column.getIsSorted();
                  const selectedIcon =
                    sorting === "asc" || sorting === "desc" ? sorting : "";

                  return (
                    <span
                      key={id}
                      className={`p-4 text-sm font-medium text-center bg-gray-200 w-full border-b flex items-center justify-center gap-2 ${
                        index === 0 &&
                        "sticky left-0 top-0 z-10 justify-between"
                      }`}
                      onClick={column.getToggleSortingHandler()}>
                      {isPlaceholder
                        ? null
                        : flexRender(column.columnDef.header, getContext())}
                      {sortingIcons[selectedIcon]}
                    </span>
                  );
                }
              )}
            </div>

            {/* Content */}
            <div className="relative">
              <motion.div className="w-full">
                {table.getRowModel().rows.map(row => (
                  <motion.div
                    key={row.id}
                    className={`relative grid items-center justify-items-center border-b`}
                    style={{ gridTemplateColumns: layout }}>
                    {row
                      .getVisibleCells()
                      .map(({ id, column, getContext }, index) => (
                        <span
                          key={id}
                          className={`px-4 py-2 text-sm font-light ${
                            index === 0 &&
                            "left-0 z-10 p-0 w-full h-full bg-[#f9fafb]"
                          }`}
                          style={{
                            position: index === 0 ? "sticky" : "relative",
                          }}>
                          {flexRender(column.columnDef.cell, getContext())}
                        </span>
                      ))}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="flex justify-end gap-16 items-center">
        <div className="flex gap-2">
          <span>Row per Page:</span>
          <select
            className="bg-inherit"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <Typography as="span">
          Page {table.getState().pagination.pageIndex + 1} Of{" "}
          {table.getPageCount()}{" "}
        </Typography>

        <span className="flex gap-4">
          <IconButton
            type="outlined"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            icon={PrevIcon}
          />
          <IconButton
            type="outlined"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            icon={NextIcon}
          />
        </span>
      </div>
    </>
  );
};

export default Table;
