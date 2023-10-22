import { useMemo } from "react";
import { StatsInterface } from "../interface/Component.Type";

const useStats = (statsData: StatsInterface[]) => {
  const stats = useMemo(() => statsData, [statsData]);

  return {
    stats,
  };
};

export default useStats;
