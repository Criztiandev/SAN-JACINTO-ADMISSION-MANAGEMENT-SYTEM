import Skeleton from "react-loading-skeleton";
const FetchLoader = () => {
  return (
    <div className="w-full h-full">
      <Skeleton height={"100%"} />
    </div>
  );
};

export default FetchLoader;
