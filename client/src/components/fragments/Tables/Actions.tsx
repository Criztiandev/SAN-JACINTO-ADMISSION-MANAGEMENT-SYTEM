import { useTableConfig } from "../../../context/TableContext";
import { useReactTable } from "@tanstack/react-table";
import IconButton from "../../IconButton";

const TableAction = () => {
  const config = useTableConfig();
  const {
    setPageIndex,
    previousPage,
    nextPage,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
  } = useReactTable(config);

  const handleFirstPage = () => setPageIndex(1);
  const handlePrevPage = () => previousPage();
  const handleNextPage = () => nextPage();
  const handleLastPage = () => setPageIndex(getPageCount() - 1);

  return (
    <tfoot>
      <tr className="flex justify-between px-6 py-3">
        <td className="flex gap-4">
          <IconButton onClick={handleFirstPage} icon={"I"} />
          <IconButton
            disabled={!getCanPreviousPage()}
            onClick={handlePrevPage}
            icon={"I"}
          />
        </td>

        <td className="flex gap-4">
          <IconButton
            disabled={!getCanNextPage()}
            onClick={handleNextPage}
            icon={"I"}
          />
          <IconButton onClick={handleLastPage} icon={"I"} />
        </td>
      </tr>
    </tfoot>
  );
};

export default TableAction;
