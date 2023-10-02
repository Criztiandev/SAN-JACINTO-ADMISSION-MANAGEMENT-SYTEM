import { useRef, useEffect } from "react";

const Checkbox = ({
  indeterminate,
  className = "",
  ...rest
}: {
  indeterminate?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`cursor-pointer ${className}`}
      {...rest}
    />
  );
};

export default Checkbox;
