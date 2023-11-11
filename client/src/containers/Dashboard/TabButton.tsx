import { motion } from "framer-motion";
import { Image } from "../../components";
import { MouseEvent } from "react";

interface TabButtonProps {
  title: string;
  icons: string;
  selected: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  pending?: boolean;
}

const TabButton = ({
  title,
  icons = "",
  selected,
  onClick,
  pending = false,
}: TabButtonProps) => {
  const selectedButton = selected === title && "bg-gray-300";
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      name={title}
      className={`p-3 rounded-[5px] border border-gray-300 flex justify-center items-center hover:bg-gray-200 ${selectedButton}`}
      disabled={pending}
      onClick={onClick}>
      <Image src={icons} alt="icon" />
    </motion.button>
  );
};

export default TabButton;
