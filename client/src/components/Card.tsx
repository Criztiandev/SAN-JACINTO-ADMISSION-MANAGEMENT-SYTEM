import { ComponentProps } from "../interface/CommonInterface";
import Typography from "./Typography";

interface HeaderProps extends ComponentProps {
  title?: string;
}

const Header = ({ title, className, children }: HeaderProps) => {
  return (
    <header className={`bg-gray-500 p-4 rounded-t-[5px] ${className}`}>
      <Typography className="text-[18px] font-medium" as="h3">
        {title}
      </Typography>
      {children}
    </header>
  );
};

const Content = ({ children, className }: ComponentProps) => {
  return <main className={className}>{children}</main>;
};

const Card = ({ className, children }: ComponentProps) => {
  return (
    <div className={`border border-[#cccccc] rounded-[5px] ${className}`}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Content = Content;

export default Card;
