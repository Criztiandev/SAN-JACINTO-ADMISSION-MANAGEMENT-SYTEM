import { StatsCard } from "../Dashboard";

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

export default StatsLoader;
