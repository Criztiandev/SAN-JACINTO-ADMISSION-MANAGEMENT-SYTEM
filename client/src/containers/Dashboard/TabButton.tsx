import { motion } from "framer-motion";
import { BarLoader, Image } from "../../components";
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
  icons,
  selected,
  onClick,
  pending = false,
}: TabButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      name={title}
      className={`w-16 h-16 rounded-[5px] border border-gray-300 flex justify-center items-center hover:bg-gray-200 ${
        selected === title && "bg-gray-300"
      }`}
      disabled={pending}
      onClick={onClick}>
      {pending ? (
        <div className=" bg-gray-400 w-full h-full flex justify-center items-center rounded-[5px]">
          <BarLoader size={32} />
        </div>
      ) : (
        <Image src={icons} />
      )}
    </motion.button>
  );
};

export default TabButton;
