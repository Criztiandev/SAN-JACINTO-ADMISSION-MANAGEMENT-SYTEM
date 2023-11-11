/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "../../components";
import Checkbox from "../../components/Checkbox";
import { motion } from "framer-motion";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface FirstColumnProps {
  data: any;
  value: string;
}

const FirstColumn = ({ data, value }: FirstColumnProps) => {
  const memoizedData = useMemo(() => data, [data]);
  const { gender } = memoizedData.original.personalDetails;
  const navigate = useNavigate();

  const handleViewToggle = () => {
    const { _id } = memoizedData.original;
    navigate(`/applicants/?APID=${_id}&state=view`);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer grid grid-cols-[16px_48px_auto] gap-4 items-center"
      onClick={handleViewToggle}>
      <Checkbox
        {...{
          checked: memoizedData.getIsSelected(),
          disabled: !memoizedData.getCanSelect(),
          indeterminate: memoizedData.getIsSomeSelected(),
          onChange: memoizedData.getToggleSelectedHandler(),
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
