import { StatsCard } from ".";
import { useQuery } from "@tanstack/react-query";
import { fetchAllData } from "../../utils/Api.utils";

interface StatsDataProps {
  title: string;
  count: number;
  increase: number;
}

const StatsSection = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await fetchAllData("dashboard"),
    queryKey: ["statsData"],
  });

  if (isLoading) return;

  const { payload } = data;
  return (
    <section className="grid grid-cols-3 gap-4">
      {payload.map((props: StatsDataProps) => (
        <StatsCard key={props.title} {...props} isLoading={isLoading} />
      ))}
    </section>
  );
};

export default StatsSection;
