/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "../../components";
import Checkbox from "../../components/Checkbox";
import { motion } from "framer-motion";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";
interface FirstColumnProps {
  data: any;
  value: any;
  viewApplicant: () => void;
}

const FirstColumn = ({ data, value, viewApplicant }: FirstColumnProps) => {
  const { gender } = data.original;

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer grid grid-cols-[16px_48px_auto] gap-4 items-center"
      onDoubleClick={viewApplicant}>
      <Checkbox
        {...{
          checked: data.getIsSelected(),
          disabled: !data.getCanSelect(),
          indeterminate: data.getIsSomeSelected(),
          onChange: data.getToggleSelectedHandler(),
        }}
      />

      <Avatar
        src={gender === "Male" ? MaleProfile : FemaleProfile}
        size="42px"
      />

      <span>{value}</span>
    </motion.div>
  );
};

export default FirstColumn;
