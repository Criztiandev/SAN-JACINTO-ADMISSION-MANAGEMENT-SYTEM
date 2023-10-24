/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import { useTableContext } from "../context/TableContext";
import TableHeader from "../containers/Table/TableHeader";
import TableRow from "../containers/Table/TableRow";
import TableAction from "../containers/Table/TableAction";
import TableEmpty from "../containers/Table/TableEmpty";

interface TableProps {
  layout: string;
}

const Table = ({ layout }: TableProps) => {
  const { table, tableData } = useTableContext();
  const { getHeaderGroups, getRowModel }: any = table;

  return (
    <>
      <motion.div
        className={`relative border overflow-scroll rounded-[5px] ${
          tableData.length <= 0 && "flex justify-center items-center"
        }`}>
        {tableData.length > 0 ? (
          getHeaderGroups().map(({ id, headers }: any) => (
            <div key={id}>
              <TableHeader key={id} headers={headers} layout={layout} />

              {/* Content */}
              <div className="relative">
                <motion.div className="w-full">
                  {getRowModel().rows.map((row: any) => (
                    <TableRow key={row.id} row={row} layout={layout} />
                  ))}
                </motion.div>
              </div>
            </div>
          ))
        ) : (
          <TableEmpty title="No Applicant Available" />
        )}
      </motion.div>

      {tableData.length >= 0 && <TableAction />}
    </>
  );
};

export default Table;
