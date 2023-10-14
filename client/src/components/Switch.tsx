import { motion } from "framer-motion";
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

interface SwitchProps {
  toggle: boolean;
  toggleSwitch: () => void;
}

const Switch = ({ toggle, toggleSwitch }: SwitchProps) => {
  return (
    <div
      className={`bg-gray-300 w-14 rounded-full border flex  items-center ${
        toggle ? "justify-start" : "justify-end"
      } `}
      onClick={toggleSwitch}>
      <motion.div
        className={`cursor-pointer w-4 h-4 bg-white rounded-full p-[14px] ${
          toggle && "bg-green-400"
        }`}
        layout
        transition={spring}
      />
    </div>
  );
};

export default Switch;
