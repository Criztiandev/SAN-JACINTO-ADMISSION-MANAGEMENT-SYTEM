/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Typography from "../../components/Typography";
import { ItemSelectProps } from "../../interface/FormInterface";
import { CardSelectionAnim } from "../../animations/Form/CardSelectVariant";
import { useField, Field } from "formik";

const ItemSelect = ({
  title,
  subtitle,
  name = "",
  value,
  active,
}: ItemSelectProps) => {
  const [field, meta] = useField({
    name: name,
  });

  return (
    <motion.label
      key={title}
      variants={CardSelectionAnim.variant}
      whileTap={{ scale: 0.9 }}
      className={`relative cursor-pointer min-w-[200px] min-h-[250px] border border-gray rounded-[5px] p-4 flex justify-center items-center flex-col gap-4 text-center shadow-lg border-gray-300 ${
        active && "border-gray-700 border-2"
      } ${meta.touched && meta.error && "border-red-500 border-2"}`}>
      <div className="w-24 h-24 rounded-full border bg-blue-500"></div>
      <div>
        <Typography as="h4">{title}</Typography>
        <Typography as="small" className="opacity-50">
          {subtitle}
        </Typography>
      </div>
      {name && (
        <>
          {/* <input {...field} type="radio" value={value} /> */}
          <Field {...field} type="radio" value={value} className="hidden" />
        </>
      )}
    </motion.label>
  );
};

export default ItemSelect;
