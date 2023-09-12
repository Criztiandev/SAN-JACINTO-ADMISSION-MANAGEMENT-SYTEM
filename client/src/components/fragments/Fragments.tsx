import { ComponentProps } from "../../interface/CommonInterface";
import { createElement } from "react";
import Typography from "../Typography";
import Dropdown from "../Dropdown";

interface HeaderProps extends ComponentProps {
  title?: string;
  icon?: string;
}

export const Header = ({ title, className }: HeaderProps) => {
  return (
    <header
      className={`bg-gray-500 p-4 rounded-t-[5px] flex justify-between  ${className}`}>
      <Typography className="text-[18px] font-medium" as="h3">
        {title}
      </Typography>
      <Dropdown />
    </header>
  );
};

interface FragmentProps extends ComponentProps {
  type?: string;
}

export const Fragment = ({
  type = "div",
  className,
  children,
}: FragmentProps) => {
  return createElement(type, { className }, children);
};
