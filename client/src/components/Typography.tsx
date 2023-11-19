import { createElement } from "react";
import { TypographyProps } from "../interface/Component.Type";

const Typography = ({ as, className, children }: TypographyProps) => {
  return createElement(as, { className: className }, children);
};

export default Typography;
