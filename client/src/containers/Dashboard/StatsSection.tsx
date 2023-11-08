import { StatsCard } from ".";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StatsDataProps {
  title: string;
  count: number;
  increase: number;
}

interface StatsSectionProps {
  serverUrl: string;
}

const StatsSection = ({ serverUrl }: StatsSectionProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`${serverUrl}/dashboard/stats`);
      return response.data;
    },
    queryKey: ["statsData"],
  });

  if (isLoading || isError) {
    return <StatsLoader />;
  }

  const { payload } = data as { payload: StatsDataProps[] };

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
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <StatsCard
            key={index}
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
