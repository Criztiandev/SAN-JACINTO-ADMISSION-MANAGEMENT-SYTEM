import { Badge, Typography } from "../../components";
import FetchLoader from "../General/FetchLoader";
interface StatsCardProps {
  value: string | number;
  subtitle: string;
  isLoading?: boolean;
}

const StatsCard = ({ value, subtitle, isLoading }: StatsCardProps) => {
  return (
    <div
      className={`rounded-[5px] min-h-[150px] ${
        !isLoading && "p-4 border border-gray-400"
      }`}>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 ">
            <Typography as="h5" className="cursor-default">
              Total
            </Typography>
            <Badge as="stats" title="+23" />
          </div>

          <div className="flex flex-col">
            <Typography as="h1" className="cursor-default">
              {value}
            </Typography>
            <small className="opacity-50 font-semibold">{subtitle}</small>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCard;
