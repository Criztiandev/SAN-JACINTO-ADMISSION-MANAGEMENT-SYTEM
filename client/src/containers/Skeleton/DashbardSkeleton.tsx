/* eslint-disable react-hooks/exhaustive-deps */
import FetchLoader from "../General/FetchLoader";
import SkeletonLayout from "../../layouts/SkeletonLayout";
import Skeleton from "react-loading-skeleton";
import StatsLoader from "../General/StatsLoader";

const DashboardSkeleton = () => {
  return (
    <SkeletonLayout
      free
      actions={
        <div className="flex gap-4">
          <Skeleton width={48} height={48} circle />
          <Skeleton width={48} height={48} circle />
        </div>
      }>
      <StatsLoader />

      <section className="h-[80vh] grid grid-cols-[auto_300px] gap-4 my-4">
        <FetchLoader />
        <FetchLoader />
      </section>
    </SkeletonLayout>
  );
};

export default DashboardSkeleton;
