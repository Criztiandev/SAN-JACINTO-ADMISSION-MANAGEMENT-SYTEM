/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface QueryProps {
  data: any;
}

const useQuery = (data: QueryProps) => {
  const [currentData, setCurrentData] = useState(data);

  return { currentData, setCurrentData };
};

export default useQuery;
