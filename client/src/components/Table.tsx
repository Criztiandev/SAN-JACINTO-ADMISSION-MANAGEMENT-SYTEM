/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import { useTableContext } from "../context/TableContext";
import TableHeader from "../containers/Table/TableHeader";
import TableRow from "../containers/Table/TableRow";
import TableAction from "../containers/Table/TableAction";
import { useEffect } from "react";
import FetchLoader from "../containers/General/FetchLoader";

interface TableProps {
  config?: any;
  layout: string;
}

const Table = ({ config, layout }: TableProps) => {
  const { table, tableData, setTableConfig } = useTableContext();
  const { getHeaderGroups, getRowModel }: any = table;

  useEffect(() => {
    if (!config) {
      throw new Error("No Table Config");
    }

    setTableConfig(config);
    return () => {
      setTableConfig([]);
    };
  }, []);

  if (tableData.length <= 0)
    return (
      <div className="relative h-full">
        <FetchLoader />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[48px] z-10 font-bold">
          No Data Available
        </span>
      </div>
    );

  return (
    <>
      <motion.div
        className={`relative border overflow-scroll rounded-[5px]  h-full ${
          tableData.length <= 0 && "flex justify-center items-center"
        }`}>
        {getHeaderGroups().map(({ id, headers }: any) => (
          <div key={id} className="h-full">
            <TableHeader key={id} headers={headers} layout={layout} />

            {/* Content */}
            <div className="relative h-full">
              <motion.div className="w-full">
                {getRowModel().rows.map((row: any) => (
                  <TableRow key={row.id} row={row} layout={layout} />
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {tableData.length >= 0 && <TableAction />}
    </>
  );
};

export default Table;
