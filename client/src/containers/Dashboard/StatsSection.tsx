import { StatsCard } from ".";
import StatsLoader from "../Loaders/StatsLoader";
import useFetch from "../../hooks/useFetch";

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

  console.log(data);

  if (isLoading || isError || isPending) return <StatsLoader />;
  return (
    <section className="grid grid-cols-3 gap-4">
      {data.map((props: StatsDataProps) => (
        <StatsCard key={props.title} {...props} />
      ))}
    </section>
  );
};

export default StatsSection;
