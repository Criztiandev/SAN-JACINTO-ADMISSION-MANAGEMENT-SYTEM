/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import { InputProps } from "../interface/FormInterface";
import { motion } from "framer-motion";
import Image from "./Image";

interface FieldProps extends InputProps {
  color?: string;
  type?: string;
  value?: any;
  disabled?: any;
  unstyled?: boolean;

  className?: string;
  icon?: string;
}

const Input = ({
  color,
  label,
  name = "",
  className,
  icon,
  ...props
}: FieldProps) => {
  const [field, meta] = useField<any>({
    name: name,
    type: props.type,
    placeholder: props.placeholder,
  });
  return (
    <motion.label className="relative flex flex-col gap-2 mb-4 text-white outline-none">
      {icon && <Image src={icon} alt="icon" />}
      {label && (
        <span className={`font-medium text-black ${color && color}`}>
          {label}
        </span>
      )}
      <input
        {...field}
        {...props}
        className={`w-full px-4 py-3 border rounded-[5px] ${
          className && className
        }`}
      />
      {meta.error && (
        <span className="absolute  bottom-[-28px] text-red-500">
          {meta.error}
        </span>
      )}
    </motion.label>
  );
};

export default Input;
