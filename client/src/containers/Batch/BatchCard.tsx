/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import useURL from "../../hooks/useURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import FetchLoader from "../General/FetchLoader";
interface BatchCardProps {
  _id: string;
  title: string;
  length: number | string;
  schedule: string;
  status: string;
}

const BatchCard = ({
  _id,
  length,
  title,
  schedule,
  status,
}: BatchCardProps) => {
  const [schedPayload, setSchedPayload] = useState<any>({});
  const { updateURL } = useURL();

  const handleClick = () => {
    updateURL(`state=view&APID=${_id}`);
  };

  const { isLoading, isError } = useQuery({
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/schedule/${schedule}`
      );
      setSchedPayload(res.data.payload);
      return res.data;
    },
    queryKey: [`batchSched${schedule}`],
  });

  if (isLoading || isError) return <FetchLoader />;

  const currentYear = new Date().getFullYear();
  const formatedStartDate = new Date(
    schedPayload?.schedule?.start
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formatedEndDate = new Date(
    schedPayload?.schedule?.end
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="relative w-[250px] h-[300px] border border-gray-400 rounded-[10px] overflow-hidden select-none">
      <div className="relative bg-coverImage bg-center h-[120px]">
        <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 font-medium rounded-full border w-[64px] h-[64px] flex justify-center items-center bg-green-300">
          <span className="text-[32px] select-none">{length}</span>
        </span>
      </div>

      {/* Details */}
      <div className="p-4 text-center my-4">
        <div className="mb-4">
          <h4 className="font-bold mt-4 mb-2">{title}</h4>
          <span className="text-gray-500">
            📆:
            {schedule === null
              ? "Schedule Not yet Defined"
              : `${formatedStartDate} - ${formatedEndDate}, ${currentYear}`}
          </span>
        </div>
        <span className="px-4 py-2 border rounded-full capitalize">
          {status}
        </span>
      </div>
    </motion.div>
  );
};

export default BatchCard;
