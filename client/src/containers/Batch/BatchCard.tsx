/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import useURL from "../../hooks/useURL";
import useFetch from "../../hooks/useFetch";
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
  const { updateURL } = useURL();

  const handleClick = () => {
    updateURL(`state=view&APID=${_id}`);
  };

  const { data } = useFetch({
    route: `/schedule/${schedule}`,
    key: [`batchSched${schedule}`],
    option: {
      enabled: !!schedule,
    },
  });

  const currentYear = new Date().getFullYear();
  const formatedStartDate = new Date(data?.schedule?.start).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
  const formatedEndDate = new Date(data?.schedule?.end).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="relative  border border-gray-400 rounded-[10px] overflow-hidden select-none min-h-[320px]">
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
        <span className="bg-[#FFEE7D] text-black  px-4 py-2 border rounded-full capitalize">
          {status}
        </span>
      </div>
    </motion.div>
  );
};

export default BatchCard;
