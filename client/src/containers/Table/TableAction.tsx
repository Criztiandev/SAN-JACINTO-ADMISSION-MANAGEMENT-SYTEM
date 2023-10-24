/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, IconButton } from "../../components";
import { useTableContext } from "../../context/TableContext";
import { PrevIcon, NextIcon } from "../../assets/icons";

const TableAction = () => {
  const { table } = useTableContext();
  const {
    getState,
    setPageSize,
    getPageCount,
    getCanPreviousPage,
    previousPage,
    getCanNextPage,
    nextPage,
  }: any = table;

  return (
    <div className="flex justify-end gap-16 items-center">
      <div className="flex gap-2">
        <span>Row per Page:</span>
        <select
          className="bg-inherit"
          value={getState().pagination.pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <Typography as="span">
        Page {getState().pagination.pageIndex + 1} Of {getPageCount()}{" "}
      </Typography>

      <span className="flex gap-4">
        <IconButton
          type="outlined"
          disabled={!getCanPreviousPage()}
          onClick={() => previousPage()}
          icon={PrevIcon}
        />
        <IconButton
          type="outlined"
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
          icon={NextIcon}
        />
      </span>
    </div>
  );
};

export default TableAction;
