import { Typography, Badge } from "../../components";

const ApplicantStats = [
  { value: "18,000", subtitle: "Junior" },
  { value: "12,000", subtitle: "Senior" },
  { value: "13,000", subtitle: "SPE & SPJ" },
];

const StatsSection = () => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {ApplicantStats.map(({ value, subtitle }) => (
        <div className="border border-gray-400 p-4 rounded-[5px]">
          <div className="flex justify-between items-center mb-4 ">
            <Typography as="h5">Total</Typography>
            <Badge as="stats" title="+23" />
          </div>

          <div className="flex flex-col">
            <Typography as="h1">{value}</Typography>
            <small className="opacity-50 font-semibold">{subtitle}</small>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
