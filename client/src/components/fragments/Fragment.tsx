import { ComponentProps } from "../../interface/CommonInterface";
import { createElement } from "react";

interface FragmentProps extends ComponentProps {
  type?: string;
}

const Fragment = ({ type = "div", className, children }: FragmentProps) => {
  return createElement(type, { className }, children);
};

export default Fragment;
