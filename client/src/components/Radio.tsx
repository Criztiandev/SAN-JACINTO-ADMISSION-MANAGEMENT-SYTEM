import { useField } from "formik";

interface RadioProps {
  label?: string;
  name: string;
  id: string;
  value: string | number;
  className?: string;
}

const Radio = ({ name, ...props }: RadioProps) => {
  const [field] = useField({ name });
  return <input type="radio" {...field} {...props} />;
};

export default Radio;
