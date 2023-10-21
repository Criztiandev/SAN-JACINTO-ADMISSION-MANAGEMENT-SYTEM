/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import Typography from "./Typography";
import { BaseProps } from "../interface/Component.Type";

interface FieldProps extends BaseProps {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
}

const Select = ({ label, name = "", ...props }: FieldProps) => {
  const [field, meta] = useField<any>({
    name: name,
    type: props.type,
    placeholder: props.placeholder,
  });

  const errorClass = meta.touched && meta.error ? "border-red-500" : "";

  return (
    <div className="flex flex-col ">
      {label && (
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
      )}
      <select
        className={`bg-inherit border border-gray-500 px-4 py-3 rounded-[5px] mb-2 w-full ${errorClass} `}
        {...field}
        {...props}
        id={name}
      />
      <Typography as="p" className="text-sm text-red-400">
        {meta.error}
      </Typography>
    </div>
  );
};

const Option = ({ label, value }: { label: string; value: string }) => {
  return <option value={value}>{label}</option>;
};

Select.Option = Option;

export default Select;
