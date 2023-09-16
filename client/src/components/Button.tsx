import { forwardRef, MouseEvent } from "react";
import { ComponentType } from "../interface/componentInterface";
import Image from "./Image";
import { ComponentStyle } from "../helper/componentHelper";
import Typography from "./Typography";

interface ButtonProps extends ComponentType {
  dir?: "left" | "right";
  icon?: string;
  title?: string;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
  name?: string;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
        ref={ref}
        className={`
        grid grid-cols-[32px_auto] justify-start rounded-full items-center 
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
