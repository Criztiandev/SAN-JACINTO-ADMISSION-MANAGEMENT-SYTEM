import { BaseProps } from "../interface/Component.Type";

const Footer = ({ children, ...props }: BaseProps) => {
  return <footer {...props}>{children}</footer>;
};

export default Footer;
