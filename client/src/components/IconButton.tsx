import { MouseEvent, forwardRef } from "react";
import Kebbab from "../assets/icons/Kebbab.svg";
import { ComponentIconStyle } from "../helper/component.helper";
import { ComponentType } from "../interface/ComponentInterfaces";

interface IconButtonProps extends ComponentType {
  icon?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | (() => void);
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon = Kebbab, onClick, disabled, type = "ghost" }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={`
        ${ComponentIconStyle({ type })} 
        p-2 rounded-full flex justify-center items-center`}>
        <img className="w-6 h-6" src={icon} alt="Kebbab" />
      </button>
    );
  }
);

export default IconButton;
