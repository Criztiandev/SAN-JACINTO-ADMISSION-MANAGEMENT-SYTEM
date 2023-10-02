/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { ComponentType } from "../interface/componentInterface";
import Image from "./Image";
import { ComponentStyle } from "../helper/componentHelper";
import Typography from "./Typography";

interface ButtonProps extends ComponentType {
  as?: "button" | "submit" | "reset";
  dir?: "left" | "right";
  icon?: string;
  title?: string;
  onClick?: any;
  name?: string;
  disabled?: boolean;
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
      name,
    },
    ref
  ) => {
    return (
      <button
        type={as}
        ref={ref}
        className={`
        flex rounded-full gap-2 items-center justify-center
        ${ComponentStyle({ type })} ${className}`}
        onClick={onClick}
        disabled={disabled}
        name={name}>
        {dir === "left" && <Image src={icon} alt="icon" />}
        <Typography
          as="span"
          className="text-[14px] w-full flex justify-between">
          {title}
        </Typography>
        {dir === "right" && <Image src={icon} alt="icon" />}
      </button>
    );
  }
);

export default Button;
