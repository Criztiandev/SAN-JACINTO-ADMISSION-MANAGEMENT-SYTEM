import { MouseEvent } from "react";
import Kebbab from "../assets/icons/Kebbab.svg";

interface IconProps {
  icon?: string;
  disabled?: boolean;
  type?: "outlined" | "ghost" | "contained";
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
}

const IconButton = ({
  icon = Kebbab,
  onClick,
  disabled,
  type = "ghost",
}: IconProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-8 h-8  rounded-full flex justify-center items-center ${
        type === "outlined" ? "border border-black" : null
      }`}>
      <img className="w-6 h-6" src={icon} alt="Kebbab" />
    </button>
  );
};

export default IconButton;
