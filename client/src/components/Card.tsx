import { BaseProps } from "../interface/Component.Type";
import { Fragment } from "./Fragments";
interface CardProps extends BaseProps {
  as?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
}

const Card = ({ as, children, ...props }: CardProps) => {
  return (
    <Fragment type={as} {...props}>
      {children}
    </Fragment>
  );
};

Card.Header = Fragment;
Card.Content = Fragment;

export default Card;
