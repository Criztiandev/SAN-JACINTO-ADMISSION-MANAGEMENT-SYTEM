/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import Typography from "./Typography";
import { InputProps } from "../interface/FormInterface";
import { MouseEvent, useState, useRef } from "react";

interface FieldProps extends InputProps {
  type?: string;
  value?: any;
  disabled?: any;
  unstyled?: boolean;
  className?: string;
  options: Array<string>;
}

const ComboBox = ({
  label,
  name = "",
  unstyled,
  className,
  options = [],
  ...props
}: FieldProps) => {
  const [currentValue, setCurrentValue] = useState("");
  const [showOption, setShowOption] = useState(false);
  const optionRef = useRef<HTMLDivElement | undefined>(undefined);
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

      <div className="relative">
        <input
          list={"browsers"}
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
          onClick={() => setShowOption(prev => !prev)}
        />

        {currentValue}

        {showOption && (
          <div className="absolute top-50 w-full border rounded-[5px] p-4 bg-white z-10 flex flex-col gap-2">
            {options?.map(items => (
              <button
                type="button"
                className="text-start p-2"
                onClick={(e: MouseEvent<HTMLButtonElement>) =>
                  setCurrentValue(e.currentTarget.value)
                }>
                {items}
              </button>
            ))}
          </div>
        )}
      </div>

      {meta.error && (
        <Typography as="p" className="text-sm text-red-400">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default ComboBox;
