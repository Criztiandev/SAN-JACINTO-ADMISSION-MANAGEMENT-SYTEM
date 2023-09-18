/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "./IconButton";
import QuestionIcon from "../assets/icons/Question_light.svg";
import { useField } from "formik";
import Typography from "./Typography";

interface FieldProps {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
}

const Input = ({ label, name = "", ...props }: FieldProps) => {
  const [field, meta] = useField<any>({
    name: name,
    type: props.type,
    placeholder: props.placeholder,
  });

  const errorClass = meta.touched && meta.error ? "border-red-500" : "";

  return (
    <div className="flex flex-col max-w-xs">
      {label && (
        <span className="flex justify-between items-center ">
          <label htmlFor={name}>{label}</label>
          <IconButton icon={QuestionIcon} />
        </span>
      )}
      <input
        className={`border px-4 py-3 rounded-[5px] mb-2 ${errorClass} `}
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

export default Input;
