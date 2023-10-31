import StatsCard from "./StatsCard";

const ApplicantStats = [
  { value: "18,000", subtitle: "Junior" },
  { value: "12,000", subtitle: "Senior" },
  { value: "13,000", subtitle: "SPE & SPJ" },
];

const StatsSection = () => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {ApplicantStats.map(props => (
        <StatsCard key={props.subtitle} {...props} isLoading />
      ))}
    </section>
  );
};

export default StatsSection;
