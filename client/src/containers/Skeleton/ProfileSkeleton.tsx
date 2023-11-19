import Skeleton from "react-loading-skeleton";
import SkeletonLayout from "../../layouts/SkeletonLayout";

const ProfileSkeleton = () => {
  return (
    <SkeletonLayout>
      <div className="flex justify-end">
        <Skeleton circle width={48} height={48} />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton height={122} />
        <Skeleton height={122} />
        <Skeleton height={122} />
      </div>
    </SkeletonLayout>
  );
};

export default ProfileSkeleton;
