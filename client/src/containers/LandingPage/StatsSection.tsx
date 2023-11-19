/* eslint-disable @typescript-eslint/no-explicit-any */

interface SchoolStatsProps {
  title: string;
  count: number;
}

interface StatsSectionProps {
  stats: Array<SchoolStatsProps>;
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="bg-[#4A1420] flex justify-center items-center gap-32 p-4 py-8">
      {stats.map((stats) => (
        <div
          key={stats.title}
          className="cursor-default flex justify-center items-center flex-col text-white">
          <h3 className="font-secondary ">{stats.count}</h3>
          <span>{stats.title}</span>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
