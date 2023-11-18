/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

import { Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";
import Skeleton from "react-loading-skeleton";

const LazyAvatar = lazy(() => import("../../components/Avatar"));
interface FirstColumnProps {
  UID: string;
  gender: string;
  value: string;
}

const FirstColumn = ({ UID, gender, value }: FirstColumnProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewToggle = () => {
    navigate(`${location.pathname}?APID=${UID}&state=view`);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer grid grid-cols-[48px_auto] gap-4 items-center"
      onClick={handleViewToggle}>
      <Suspense fallback={<Skeleton width={48} height={48} circle />}>
        <LazyAvatar
          src={gender === "Male" ? MaleProfile : FemaleProfile}
          size="42px"
        />
      </Suspense>
      <span>{value}</span>
    </motion.div>
  );
};

export default FirstColumn;
