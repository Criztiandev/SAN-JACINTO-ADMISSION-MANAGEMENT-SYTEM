import { Badge, Typography } from "../../components";

interface StatsCardProps {
  value: string | number;
  subtitle: string;
}

const StatsCard = ({ value, subtitle }: StatsCardProps) => {
  return (
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
  );
};

export default StatsCard;
