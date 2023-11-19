import Skeleton from "react-loading-skeleton";
import SkeletonLayout from "../../layouts/SkeletonLayout";

const ScheduleSkeleton = () => {
  return (
    <SkeletonLayout
      free
      actions={
        <div className="flex gap-4">
          <Skeleton height={45} width={145} />
          <Skeleton height={45} width={145} />
          <Skeleton height={48} width={48} circle />
        </div>
      }>
      <div className="relative w-full rounded-[5px] flex flex-col gap-2 overflow-hidden h-[78vh] ">
        <Skeleton height={"78vh"} width={"100%"} />
      </div>
    </SkeletonLayout>
  );
};

export default ScheduleSkeleton;
