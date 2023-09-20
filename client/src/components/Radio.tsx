import { useField } from "formik";

interface propsInterface {
  label?: string;
  name: string;
  id: string;
}

const Radio = ({ name, ...props }: propsInterface) => {
  const [field] = useField({
    name: name,
  });

  return <input type="radio" {...field} {...props} />;
};

export default Radio;
