import { BaseProps } from "../interface/Component.Type";

const Header = ({ children, ...props }: BaseProps) => {
  return <header {...props}>{children}</header>;
};

export default Header;
