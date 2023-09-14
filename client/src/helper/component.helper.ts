import { ComponentType } from "../interface/ComponentInterfaces";

export const ComponentStyle = ({ type = "contained" }: ComponentType) => {
  const styles = {
    contained: "bg-[#cccccc] px-[20px] p-3 ",
    outlined: "border border-base px-[20px] p-3 ",
    ghost: "px-[20px] p-3 ",
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
