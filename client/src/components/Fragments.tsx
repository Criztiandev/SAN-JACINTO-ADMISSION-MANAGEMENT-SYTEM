import Typography from "./Typography";
import Dropdown from "./Dropdown";
import { BaseProps } from "../interface/componentInterface";
import { createElement } from "react";

interface HeaderProps extends BaseProps {
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

interface FragmentProps extends BaseProps {
  type?: string;
}

export const Fragment = ({
  type = "section",
  className,
  children,
}: FragmentProps) => {
  return createElement(type, { className }, children);
};
