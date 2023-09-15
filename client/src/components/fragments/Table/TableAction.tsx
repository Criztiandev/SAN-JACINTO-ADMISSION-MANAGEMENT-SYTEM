import { useTableContext } from "../../../context/TableContext";

const TableAction = () => {
  const { table } = useTableContext();

  const {
    setPageIndex,
    getCanPreviousPage,
    previousPage,
    nextPage,
    getCanNextPage,
    getPageCount,
  } = table;

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <button onClick={() => setPageIndex(0)}>First Page</button>
        <button disabled={!getCanPreviousPage()} onClick={() => previousPage()}>
          Prev Page
        </button>
      </div>

      <div className="flex gap-4">
        <button disabled={!getCanNextPage()} onClick={() => nextPage()}>
          Next Page
        </button>
        <button onClick={() => setPageIndex(getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};
export default TableAction;
