/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import Typography from "./Typography";
import { InputInterface } from "../interface/componentInterface";

interface FieldProps extends InputInterface {
  type?: string;
  value?: any;
  disabled?: any;
  unstyled?: boolean;
  className?: string;
}

const Input = ({
  label,
  name = "",
  unstyled,
  className,
  ...props
}: FieldProps) => {
  const [field, meta] = useField<any>({
    name: name,
    type: props.type,
    placeholder: props.placeholder,
  });
  const errorClass = meta.touched && meta.error ? "border-red-500" : "";
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
      )}
      <input
        className={
          unstyled
            ? ""
            : `border border-gray-400 px-4 py-3 rounded-[5px] mb-2 w-full ${errorClass} ${
                props.disabled ? "text-gray-400" : ""
              } ${className}`
        }
        {...field}
        {...props}
        id={name}
      />
      {meta.error && (
        <Typography as="p" className="text-sm text-red-400">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default Input;
