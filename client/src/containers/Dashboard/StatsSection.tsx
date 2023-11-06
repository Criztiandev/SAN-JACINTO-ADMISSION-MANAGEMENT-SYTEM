import { StatsCard } from ".";
import { useQuery } from "@tanstack/react-query";
import { fetchAllData } from "../../utils/Api.utils";

interface StatsDataProps {
  title: string;
  count: number;
  increase: number;
}

const StatsSection = () => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryFn: async () => await fetchAllData("dashboard"),
    queryKey: ["statsData"],
  });

  if (isLoading || isError || !isFetched) return <StatsLoader />;

  const { payload } = data;

  return (
    <section className="grid grid-cols-3 gap-4">
      {payload.map((props: StatsDataProps) => (
        <StatsCard key={props.title} {...props} />
      ))}
    </section>
  );
};

const StatsLoader = () => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {[{}, {}, {}].map(() => (
        <StatsCard
          key={Math.random()}
          title="NA"
          count={0}
          increase={0}
          isLoading={true}
        />
      ))}
    </section>
  );
};

export default StatsSection;
