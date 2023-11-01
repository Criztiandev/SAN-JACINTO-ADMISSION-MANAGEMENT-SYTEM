/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { BaseButtonStyle } from "../helper/component.Helper";
import { ButtonProps } from "../interface/Component.Type";
import { Image, Typography } from ".";
import { motion } from "framer-motion";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "contained",
      dir = "left",
      title,
      icon,
      className,
      unstyled,
      ...props
    },
    ref
  ) => {
    const finalizeStyle = `${
      className && className
    } flex rounded-full gap-2 items-center justify-center ${
      !unstyled && BaseButtonStyle(as)
    }`;

    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        ref={ref}
        className={finalizeStyle}
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
