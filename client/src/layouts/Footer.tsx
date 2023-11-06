import { BaseProps } from "../interface/Common.Types";

const Footer = ({ children, ...props }: BaseProps) => {
  return <footer {...props}>{children}</footer>;
};

export default Footer;
