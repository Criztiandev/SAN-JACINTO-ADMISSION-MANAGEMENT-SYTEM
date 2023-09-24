import React from "react";
import { useField, Field } from "formik";
import { BaseProps } from "../interface/componentInterface";
import { Fragment } from "./Fragments";

interface RadioProps {
  label?: string;
  name: string;
  id: string;
}

interface RadioItemProps extends BaseProps {
  name?: string;
  value?: string | number;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const Radio = ({ name, ...props }: RadioProps) => {
  const [field] = useField({ name });

  return <input type="radio" {...field} {...props} />;
};

const RadioItem = ({ name, onClick, children, ...props }: RadioItemProps) => {
  return (
    <label htmlFor={props.id} className={props.className} onClick={onClick}>
      {children}
      <Field
        type="radio"
        name={name}
        value={props.value}
        id={props.id}
        className="hidden"
      />
    </label>
  );
};

Radio.Select = {
  Group: Fragment,
  Item: RadioItem,
};

export default Radio;
