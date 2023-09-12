import { MouseEvent } from "react";

interface IconProps {
  icon?: string;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
}

const IconButton = ({ icon = "I", onClick }: IconProps) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 border border-black rounded-full">
      {icon}
    </button>
  );
};

export default IconButton;
