import { ComponentType } from "../interface/ComponentInterfaces";
import Image from "./Image";

interface ButtonProps extends ComponentType {
  dir: "left" | "right";
  icon: string;
  title: string;
}

const Button = ({ dir, title, icon, type = "contained" }: ButtonProps) => {
  const componentStyle = {
    contained: "bg-[#cccccc]",
    outlined: "border border-base",
    ghost: "",
  };

  return (
    <button
      className={`${componentStyle[type]} text-[14px] flex justify-center items-center gap-2   rounded-full px-[20px] p-3 `}>
      {dir === "left" && <Image src={icon} alt="icon" />}
      {title}
      {dir === "right" && <Image src={icon} alt="icon" />}
    </button>
  );
};

export default Button;
