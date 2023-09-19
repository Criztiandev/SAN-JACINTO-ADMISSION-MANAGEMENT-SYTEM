import { MouseEvent, forwardRef } from "react";
import Kebbab from "../assets/icons/Kebbab.svg";
import { ComponentIconStyle } from "../helper/componentHelper";
import { ComponentType } from "../interface/componentInterface";

interface IconButtonProps extends ComponentType {
  as?: "button" | "submit";
  icon?: string;
  disabled?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | (() => void);
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon = Kebbab,
      onClick,
      disabled,
      type = "ghost",
      className = "",
      name,
      as = "button",
    },
    ref
  ) => {
    return (
      <button
        type={as}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        name={name}
        className={`
        ${ComponentIconStyle({ type })} 
        p-2 rounded-full flex justify-center items-center ${className}`}>
        <img className="w-6 h-6" src={icon} alt="Kebbab" />
      </button>
    );
  }
);

export default IconButton;
