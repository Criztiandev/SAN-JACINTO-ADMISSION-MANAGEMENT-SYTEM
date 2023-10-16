/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import Typography from "./Typography";
import { InputProps } from "../interface/FormInterface";

const Textarea = ({ label, name = "", ...props }: InputProps) => {
  const [field, meta] = useField<any>({
    name: name,
    type: props.type,
    placeholder: props.placeholder,
  });
  const errorClass = meta.touched && meta.error ? "border-red-500" : "";
  return (
    <div className="flex flex-col h-full">
      {label && (
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`border px-4 py-3 rounded-[5px] mb-2 w-full h-full ${errorClass} `}
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

export default Textarea;
