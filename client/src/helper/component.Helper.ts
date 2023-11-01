import { ComponentStyle } from "../interface/Common.Types";

export const BaseButtonStyle = (type: ComponentStyle) => {
  if (type === "contained")
    return `bg-[#1e1e1e] px-[20px] py-[10px] text-white`;
  return type === "outlined"
    ? `border border-gray-300  px-[20px] py-[10px]`
    : "px-[20px] py-[10px]";
};

export const BaseIconButtonStyle = (as: ComponentStyle) => {
  if (as === "contained") return "bg-[#cccccc]";
  return as === "outlined" ? "border border-gray-300" : "p-0";
};
