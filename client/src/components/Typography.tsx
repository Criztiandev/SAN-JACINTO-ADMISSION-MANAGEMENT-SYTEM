import { createElement } from "react";
import { TextProps } from "../interface/ComponentInterfaces";

const Typography = ({ as, className, children }: TextProps) => {
  return createElement(as, { className: className }, children);
};

export default Typography;
