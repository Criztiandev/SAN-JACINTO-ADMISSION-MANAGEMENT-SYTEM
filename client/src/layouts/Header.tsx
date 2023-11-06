import { Typography } from "../components";
import { BaseProps } from "../interface/Common.Types";
import { CommonLayoutProps } from "../interface/Layout.Types";

const Header = ({ children, ...props }: BaseProps) => {
  return <header {...props}>{children}</header>;
};

const HeaderLayout = ({
  title,
  subtitle,
  children,
  className,
}: CommonLayoutProps) => {
  return (
    <header className="flex justify-between items-center">
      <span>
        <Typography as="h1">{title}</Typography>
        <Typography as="small">{subtitle}</Typography>
      </span>

      <span className={`flex gap-4 ${className || ""}`}>{children}</span>
    </header>
  );
};

Header.Layout = HeaderLayout;

export default Header;
