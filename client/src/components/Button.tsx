import { forwardRef, MouseEvent } from "react";
import { ComponentType } from "../interface/ComponentInterfaces";
import Image from "./Image";

interface ButtonProps extends ComponentType {
  dir: "left" | "right";
  icon?: string;
  title?: string;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ dir, title, icon, type = "contained", onClick }, ref) => {
    const componentStyle = {
      contained: "bg-[#cccccc]",
      outlined: "border border-base",
      ghost: "",
    };

    return (
      <button
        ref={ref}
        className={`${componentStyle[type]} text-[14px] flex justify-center items-center gap-2   rounded-full px-[20px] p-3 `}
        onClick={onClick}>
        {dir === "left" && <Image src={icon} alt="icon" />}
        {title}
        {dir === "right" && <Image src={icon} alt="icon" />}
      </button>
    );
  }
);

export default Button;
