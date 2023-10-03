/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "../../components";
import Checkbox from "../../components/Checkbox";

interface FirstColumnProps {
  data: any;
  value: any;
  viewApplicant: () => void;
}

const FirstColumn = ({ data, value, viewApplicant }: FirstColumnProps) => {
  return (
    <div
      className="grid grid-cols-[16px_32px_auto] gap-4 items-center"
      onDoubleClick={viewApplicant}>
      <Checkbox
        {...{
          checked: data.getIsSelected(),
          disabled: !data.getCanSelect(),
          indeterminate: data.getIsSomeSelected(),
          onChange: data.getToggleSelectedHandler(),
        }}
      />

      <Avatar />

      <span>{value}</span>
    </div>
  );
};

export default FirstColumn;
