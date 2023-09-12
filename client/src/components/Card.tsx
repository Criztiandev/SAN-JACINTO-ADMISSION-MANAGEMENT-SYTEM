import Fragment from "./Fragment";
import { ComponentProps } from "../interface/CommonInterface";
import Typography from "./Typography";
import IconButton from "./IconButton";

interface HeaderProps extends ComponentProps {
  title?: string;
  icon?: string;
}

const Header = ({ title, className, icon }: HeaderProps) => {
  return (
    <header
      className={`bg-gray-500 p-4 rounded-t-[5px] flex justify-between  ${className}`}>
      <Typography className="text-[18px] font-medium" as="h3">
        {title}
      </Typography>
      {icon && <IconButton icon={icon} />}
    </header>
  );
};

const Card = ({ className, children }: ComponentProps) => {
  return (
    <Fragment className={`border border-[#cccccc] rounded-[5px] ${className}`}>
      {children}
    </Fragment>
  );
};

Card.Header = Header;
Card.Content = Fragment;

export default Card;
