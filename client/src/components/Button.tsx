import { forwardRef, MouseEvent } from "react";
import { ComponentType } from "../interface/componentInterface";
import Image from "./Image";
import { ComponentStyle } from "../helper/componentHelper";

interface ButtonProps extends ComponentType {
  dir?: "left" | "right";
  icon?: string;
  title?: string;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
  name?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { dir, title, icon, type = "contained", onClick, className = "", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
        text-[14px]rounded-full rounded-full grid grid-cols-[32px_auto] justify-start
        ${ComponentStyle({ type })} ${className}`}
        onClick={onClick}
        {...props}>
        {dir === "left" && <Image src={icon} alt="icon" />}
        <span className="w-full flex justify-between">{title}</span>
        {dir === "right" && <Image src={icon} alt="icon" />}
      </button>
    );
  }
);

export default Button;
