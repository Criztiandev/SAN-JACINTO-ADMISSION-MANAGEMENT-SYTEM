import IconButton from "../../components/IconButton";
import { motion } from "framer-motion";
import useURL from "../../hooks/useURL";

interface BatchCardProps {
  _id: string;
  title: string;
  length: number | string;
  schedule: string;
}

const BatchCard = ({ _id, length, title, schedule }: BatchCardProps) => {
  const { updateURL } = useURL();

  const handleClick = () => {
    updateURL(`state=view&APID=${_id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="relative w-[250px] h-[280px] border border-gray-400 rounded-[10px] overflow-hidden select-none">
      <IconButton className="absolute top-3 right-3" />
      <div className="relative bg-coverImage bg-center h-[120px]">
        <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 font-medium rounded-full border w-[64px] h-[64px] flex justify-center items-center bg-green-300">
          <span className="text-[32px] select-none">{length}</span>
        </span>
      </div>

      {/* Details */}
      <div className="p-4 text-center my-4">
        <h4 className="font-bold mt-4 mb-2">{title}</h4>
        <span className="text-gray-500">
          📆: {schedule === null ? "Schedule Not yet Defined" : schedule}
        </span>
      </div>
    </motion.div>
  );
};

export default BatchCard;
