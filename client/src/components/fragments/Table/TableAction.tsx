import { useTableContext } from "../../../context/TableContext";
import IconButton from "../../IconButton";
import ArrowLeftIcon from "../../../assets/icons/Arrow Left.svg";
import ArrowRightIcon from "../../../assets/icons/Arrow Right.svg";
import Button from "../../Button";

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
        <Button
          dir="left"
          title="Previuos"
          type="outlined"
          icon={ArrowLeftIcon}
          onClick={() => setPageIndex(0)}
        />

        <IconButton
          type="outlined"
          className="px-[0.7rem]"
          icon={ArrowLeftIcon}
          disabled={!getCanPreviousPage()}
          onClick={() => previousPage()}
        />
      </div>

      <div className="flex gap-4">
        <IconButton
          className="px-[0.7rem]"
          type="outlined"
          icon={ArrowRightIcon}
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
        />

        <Button
          dir="right"
          title="Last"
          type="outlined"
          icon={ArrowRightIcon}
          onClick={() => setPageIndex(getPageCount() - 1)}
        />
      </div>
    </div>
  );
};
export default TableAction;
