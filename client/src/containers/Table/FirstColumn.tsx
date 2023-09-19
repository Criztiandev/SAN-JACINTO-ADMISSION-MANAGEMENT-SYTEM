/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "../../components/Avatar";
import { useTableContext } from "../../context/TableContext";

interface FirstColumnProps {
  row: any;
  value: any;
  isSelection: boolean;
}

const FirstColumn = ({ isSelection = true, row, value }: FirstColumnProps) => {
  const { dispatch } = useTableContext();

  const handleViewProfile = () => {
    console.log("Clicked");
    if (!isSelection) dispatch({ type: "SET_VIEW_PROFILE" });
  };

  return (
    <label
      className="cursor-pointer flex gap-4 px-4 items-center"
      onClick={handleViewProfile}>
      {isSelection ? (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ) : null}
      <Avatar />
      <span>{value()}</span>
    </label>
  );
};
export default FirstColumn;
