/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ComponentType } from "../interface/componentInterface";
import { ComponentStyle } from "../helper/componentHelper";
import Typography from "./Typography";
import Image from "./Image";

interface ButtonProps extends ComponentType {
  as?: "button" | "submit" | "reset";
  dir?: "left" | "right";
  icon?: string;
  title?: string;
  onClick?: any;
  name?: string;
  disabled?: boolean;
  value?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      dir,
      title,
      icon,
      type = "contained",
      onClick,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        whileTap={{ scale: 0.5 }}
        type={as}
        ref={ref}
        className={`
        flex rounded-full gap-2 items-center justify-center
        ${ComponentStyle({ type })} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}>
        {dir === "left" && <Image src={icon} alt="icon" />}
        <Typography
          as="span"
          className="text-[14px] w-full flex justify-between">
          {title}
        </Typography>
        {dir === "right" && <Image src={icon} alt="icon" />}
      </motion.button>
    );
  }
);

export default Button;
