/* eslint-disable @typescript-eslint/no-explicit-any */
import Checkbox from "../../components/Checkbox";

const TitleHeader = ({ data }: any) => {
  return (
    <div className="flex gap-4">
      <Checkbox
        {...{
          checked: data.getIsAllRowsSelected(),
          indeterminate: data.getIsSomeRowsSelected(),
          onChange: data.getToggleAllRowsSelectedHandler(),
        }}
      />
      <span className="w-full">Name</span>
    </div>
  );
};

export default TitleHeader;
