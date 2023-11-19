/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

interface SwitchButtonProps {
  icon: string;
  toggle: boolean;
  color: string;
  variant?: any;
  onClick: () => void;
}

const SwitchButton = ({
  toggle,
  icon,
  color,
  variant = {},
  onClick,
}: SwitchButtonProps) => {
  return (
    <motion.button
      type="button"
      animate={toggle && "selected"}
      variants={variant}
      disabled={toggle}
      whileTap={{ scale: 0.7 }}
      className={`border rounded-full  hover:border-green-600 hover:bg-[${color}]`}
      onClick={onClick}>
      <img src={icon} alt="icon" className="p-2" />
    </motion.button>
  );
};

export default SwitchButton;
