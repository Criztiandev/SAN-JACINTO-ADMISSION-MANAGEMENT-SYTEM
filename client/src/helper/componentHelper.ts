import { ComponentType } from "../interface/Component.Type";

export const ComponentStyle = ({ type = "contained" }: ComponentType) => {
  const styles = {
    contained: `bg-[#1e1e1e] px-[20px] py-[10px] text-white hover:bg-[#cccccc] hover:text-black`,
    outlined: `border border-base  px-[20px] py-[10px] hover:bg-blue-300`,
    ghost: ` px-[20px] py-[10px] `,
    unstyled: "",
  };

  return styles[type];
};

export const ComponentIconStyle = ({ type = "contained" }: ComponentType) => {
  const styles = {
    contained: "bg-[#cccccc] ",
    outlined: "border border-base  ",
    ghost: "p-0",
    unstyled: "p-0",
  };

  return styles[type];
};
