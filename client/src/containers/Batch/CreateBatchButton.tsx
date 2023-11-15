import { motion } from "framer-motion";
import CreateIcon from "../../assets/icons/Create_Applicant.svg";
import Image from "../../components/Image";

const CreateBatchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, background: "" }}
      onClick={onClick}
      className="cursor-pointer w-[250px] h-[280px] bg-gray-300 rounded-[5px] flex flex-col gap-2 justify-center items-center select-none">
      <Image src={CreateIcon} alt="create" className="w-[48px] h-[48px]" />
      <h3 className="font-bold">Create Batch</h3>
    </motion.div>
  );
};

export default CreateBatchButton;
