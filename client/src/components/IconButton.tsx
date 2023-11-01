import Kebbab from "../assets/icons/Kebbab.svg";
import { forwardRef } from "react";
import { ComponentIconStyle } from "../helper/componentHelper";
import { motion } from "framer-motion";
import { IconButtonProps } from "../interface/Component.Type";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, as, icon, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        ref={ref}
        className={`
        ${ComponentIconStyle({ as })} 
        p-2 rounded-full flex justify-center items-center ${
          className || ""
        } hover:bg-gray-200`}
        {...props}>
        <img className="w-6 h-6" src={icon || Kebbab} alt="Kebbab" />
      </motion.button>
    );
  }
);

export default IconButton;
