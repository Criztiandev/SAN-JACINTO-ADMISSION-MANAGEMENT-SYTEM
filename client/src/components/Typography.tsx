import { createElement } from "react";
import { TextProps } from "../interface/componentInterface";

const Typography = ({ as, className, children }: TextProps) => {
  return createElement(as, { className: className }, children);
};

export default Typography;
