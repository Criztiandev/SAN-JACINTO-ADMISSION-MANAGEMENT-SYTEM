import Kebbab from "../assets/icons/Kebbab.svg";
import { forwardRef } from "react";
import { BaseIconButtonStyle } from "../helper/component.Helper";
import { motion } from "framer-motion";
import { IconButtonProps } from "../interface/Component.Type";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "button", as = "contained", icon, className, ...props }, ref) => {
    const preferedStyle = BaseIconButtonStyle(as);
    const finalizedStyle = `${
      className && className
    } p-2 rounded-full flex justify-center items-center border border-gray-400 select-none ${
      props.disabled && "opacity-50"
    } ${preferedStyle}`;

    return (
      <motion.button
        type={type}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        ref={ref}
        className={finalizedStyle}
        {...props}>
        <img className="w-6 h-6" src={icon || Kebbab} alt="Kebbab" />
      </motion.button>
    );
  }
);

export default IconButton;
