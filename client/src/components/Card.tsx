import { BaseProps } from "../interface/componentInterface";
import { Fragment } from "./Fragments";
import { Field } from "formik";
interface CardProps extends BaseProps {
  as?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
}

interface ItemProps extends BaseProps {
  name?: string;
  value?: string | number;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
}

const Card = ({ as, children, ...props }: CardProps) => {
  return (
    <Fragment type={as} {...props}>
      {children}
    </Fragment>
  );
};

const Items = ({
  name,
  children,
  value,
  id,
  className,
  onClick,
}: ItemProps) => {
  return (
    <label htmlFor={id} className={className} onClick={onClick}>
      {children}
      <Field
        type="radio"
        name={name}
        value={value}
        id={id}
        className="hidden"
      />
    </label>
  );
};

Card.Header = Fragment;
Card.Content = Fragment;
Card.Select = {
  Container: Fragment,
  Items,
};

export default Card;
