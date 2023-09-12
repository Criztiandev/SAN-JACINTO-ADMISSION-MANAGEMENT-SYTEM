import { BaseProps } from "../interface/ComponentInterfaces";
import { Fragment, Header } from "./fragments/Fragments";

const Card = ({ className, children }: BaseProps) => {
  return (
    <div className={`border border-[#cccccc] rounded-[5px] ${className}`}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Content = Fragment;

export default Card;
