import { createElement } from "react";
import { ComponentProps } from "../interface/CommonInterface";

interface TypographyProps extends ComponentProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p";
}

const Typography = ({ as, className, children }: TypographyProps) => {
  return createElement(as, { className: className }, children);
};

export default Typography;
