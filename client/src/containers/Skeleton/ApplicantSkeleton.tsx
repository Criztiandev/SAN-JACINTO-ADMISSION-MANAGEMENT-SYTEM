import FetchLoader from "../../containers/General/FetchLoader";
import SkeletonLayout from "../../layouts/SkeletonLayout";
import Skeleton from "react-loading-skeleton";

const TablePanelSkeleton = () => {
  return (
    <SkeletonLayout actions={<Skeleton height={45} width={145} />}>
      <div className="flex justify-between items-center">
        <div className="w-[300px] rounded-ful h-[49px]">
          <Skeleton width={"100%"} height={"100%"} />
        </div>

        <div className="flex gap-4">
          <Skeleton height={45} width={145} />
          <Skeleton height={45} width={145} />
        </div>
      </div>

      <FetchLoader />
    </SkeletonLayout>
  );
};

export default TablePanelSkeleton;
