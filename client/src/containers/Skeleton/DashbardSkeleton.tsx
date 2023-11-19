/* eslint-disable react-hooks/exhaustive-deps */
import FetchLoader from "../General/FetchLoader";
import SkeletonLayout from "../../layouts/SkeletonLayout";
import Skeleton from "react-loading-skeleton";

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
      <div className="grid grid-cols-3 gap-4">
        <Skeleton width={368} height={150} />
        <Skeleton width={368} height={150} />
        <Skeleton width={368} height={150} />
      </div>

      <section className="h-[80vh] grid grid-cols-[auto_300px] gap-4 my-4">
        <FetchLoader />
        <FetchLoader />
      </section>
    </SkeletonLayout>
  );
};

export default DashboardSkeleton;
