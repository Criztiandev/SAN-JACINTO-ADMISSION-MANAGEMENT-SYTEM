import { BaseProps } from "../interface/componentInterface";
import { createElement } from "react";
import { forwardRef } from "react";

interface FragmentProps extends BaseProps {
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
}

export const Fragment = forwardRef(
  ({ type = "div", className, onClick, children }: FragmentProps, ref) => {
    return createElement(type, { ref, className, onClick }, children);
  }
);
