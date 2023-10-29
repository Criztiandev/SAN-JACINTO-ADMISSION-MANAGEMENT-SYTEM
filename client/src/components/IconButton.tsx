import { MouseEvent, forwardRef } from "react";
import Kebbab from "../assets/icons/Kebbab.svg";
import { ComponentIconStyle } from "../helper/componentHelper";
import { ComponentType } from "../interface/Component.Type";
import { motion } from "framer-motion";

interface IconButtonProps extends ComponentType {
  as?: "button" | "submit";
  icon?: string;
  disabled?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | (() => void);
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon = Kebbab,
      onClick,
      disabled,
      type = "ghost",
      className = "",
      name,
      as = "button",
    },
    ref
  ) => {
    return (
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        type={as}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        name={name}
        className={`
        ${ComponentIconStyle({ type })} 
        p-2 rounded-full flex justify-center items-center ${
          className || ""
        } hover:bg-gray-200`}>
        <img className="w-6 h-6" src={icon} alt="Kebbab" />
      </motion.button>
    );
  }
);

export default IconButton;
