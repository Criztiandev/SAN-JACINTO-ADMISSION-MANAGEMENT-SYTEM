import Kebbab from "../assets/icons/Kebbab.svg";
import { forwardRef } from "react";
import { ComponentIconStyle } from "../helper/component.Helper";
import { motion } from "framer-motion";
import { IconButtonProps } from "../interface/Component.Type";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, as, icon, ...props }, ref) => {
    const preferedStyle = ComponentIconStyle();
    const finalizedStyle = `${
      className && className
    } p-2 rounded-full flex justify-center items-center border border-gray-400`;

    return (
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        ref={ref}
        className={preferedStyle}
        {...props}>
        <img className="w-6 h-6" src={icon || Kebbab} alt="Kebbab" />
      </motion.button>
    );
  }
);

export default IconButton;
