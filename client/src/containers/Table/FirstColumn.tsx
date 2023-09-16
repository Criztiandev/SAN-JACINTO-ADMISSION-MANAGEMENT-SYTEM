/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "../../components/Avatar";

interface FirstColumnProps {
  row: any;
  value: any;
  isSelection: boolean;
}

const FirstColumn = ({ isSelection = true, row, value }: FirstColumnProps) => {
  return (
    <label
      className="cursor-pointer flex gap-4 px-4 items-center"
      onClick={() => {
        !isSelection && alert("Nice");
      }}>
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
