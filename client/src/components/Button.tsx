import { forwardRef, MouseEvent } from "react";
import { ComponentType } from "../interface/ComponentInterfaces";
import Image from "./Image";
import { ComponentStyle } from "../helper/component.helper";

interface ButtonProps extends ComponentType {
  dir: "left" | "right";
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
    { dir, title, icon, type = "contained", onClick, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${ComponentStyle({
          type,
        })} ${className} text-[14px] flex gap-2 items-center   rounded-full `}
        onClick={onClick}
        {...props}>
        {dir === "left" && <Image src={icon} alt="icon" />}
        {title}
        {dir === "right" && <Image src={icon} alt="icon" />}
      </button>
    );
  }
);

export default Button;
