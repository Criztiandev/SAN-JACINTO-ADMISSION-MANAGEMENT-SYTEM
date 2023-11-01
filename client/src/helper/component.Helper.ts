type ComponentStyle = "contained" | "outlined" | "ghost";

export const ComponentStyle = (type: ComponentStyle) => {
  if (type === "contained")
    return `bg-[#1e1e1e] px-[20px] py-[10px] text-white`;
  return type === "outlined"
    ? `border border-gray-300  px-[20px] py-[10px]`
    : "px-[20px] py-[10px]";
};

export const BaseIconStyle = (type: ComponentStyle) => {
  if (type === "contained") return "bg-[#cccccc]";
  return type === "outlined" ? "border border-gray-300" : "p-0";
};
