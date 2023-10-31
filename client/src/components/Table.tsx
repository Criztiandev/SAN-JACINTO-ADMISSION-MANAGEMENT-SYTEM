/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import { useTableContext } from "../context/TableContext";
import TableHeader from "../containers/Table/TableHeader";
import TableRow from "../containers/Table/TableRow";
import TableAction from "../containers/Table/TableAction";
import FetchLoader from "../containers/General/FetchLoader";

interface TableProps {
  layout: string;
}

const Table = ({ layout }: TableProps) => {
  const { table, tableData } = useTableContext();
  const { getHeaderGroups, getRowModel }: any = table;

  return (
    <>
      <motion.div
        className={`relative border overflow-scroll rounded-[5px]  h-full ${
          tableData.length <= 0 && "flex justify-center items-center"
        }`}>
        {tableData.length > 0 ? (
          getHeaderGroups().map(({ id, headers }: any) => (
            <div key={id}>
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
          ))
        ) : (
          <FetchLoader />
        )}
      </motion.div>

      {tableData.length >= 0 && <TableAction />}
    </>
  );
};

export default Table;
