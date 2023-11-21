import StatsCard from "./StatsCard";
import useFetch from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
interface StatsDataProps {
  title: string;
  count: number;
  increase: number;
}

const StatsSection = () => {
  const { data, isLoading, isError, isPending } = useFetch({
    route: "/dashboard/stats",
    key: ["stats"],
  });

  if (isLoading || isError || isPending)
    return (
      <div className="grid grid-cols-3 gap-4">
        <Skeleton width={368} height={150} />
        <Skeleton width={368} height={150} />
        <Skeleton width={368} height={150} />
      </div>
    );
  return (
    <section className="grid grid-cols-3 gap-4">
      {data.map((props: StatsDataProps) => (
        <StatsCard key={props.title} {...props} />
      ))}
    </section>
  );
};

export default StatsSection;
