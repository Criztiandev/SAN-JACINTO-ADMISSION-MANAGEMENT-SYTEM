import { ComponentType } from "../interface/componentInterface";

export const ComponentStyle = ({ type = "contained" }: ComponentType) => {
  const styles = {
    contained: "bg-[#cccccc] px-[20px] py-[16px] ",
    outlined: "border border-base px-[20px] py-[8px] ",
    ghost: "px-[20px] py-3 ",
    unstyled: "p-0",
  };

  return styles[type];
};

export const ComponentIconStyle = ({ type = "contained" }: ComponentType) => {
  const styles = {
    contained: "bg-[#cccccc]  ",
    outlined: "border border-base  ",
    ghost: "p-0",
    unstyled: "p-0",
  };

  return styles[type];
};
