import Typography from "../../components/Typography";

interface StatsCardProps {
  title?: string;
  count?: string | number;
  increase?: number | string;
  isLoading?: boolean;
  icon: string[];
  index: number;
}

const StatsCard = ({
  count,
  title,
  isLoading,
  icon,
  index,
}: StatsCardProps) => {
  return (
    <div
      className={`rounded-[5px] min-h-[150px] flex gap-8 items-center ${
        !isLoading && "p-4 border border-gray-400"
      }`}>
      <div className="bg-gray-200 flex justify-center items-center p-4 rounded-full">
        <span className="text-2xl">{icon[index]}</span>
      </div>
      <div>
        <Typography as="h1" className="cursor-default">
          {count}
        </Typography>
        <div className="opacity-50 font-medium ">{title}</div>
      </div>
    </div>
  );
};

export default StatsCard;
