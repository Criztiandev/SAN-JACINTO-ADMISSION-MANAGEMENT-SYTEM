import { ComponentProps } from "../interface/CommonInterface";
import { Fragment, Header } from "./fragments/Fragments";

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
