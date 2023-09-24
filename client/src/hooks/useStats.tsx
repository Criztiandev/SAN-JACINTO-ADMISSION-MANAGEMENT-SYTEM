import { useMemo } from "react";
import { StatsInterface } from "../interface/componentInterface";

const useStats = (statsData: StatsInterface[]) => {
  const stats = useMemo(() => statsData, [statsData]);

  return {
    stats,
  };
};

export default useStats;
