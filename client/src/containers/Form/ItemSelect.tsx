/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../../components/Image";
import Radio from "../../components/Radio";
import Typography from "../../components/Typography";
import { ItemSelectProps } from "../../interface/FormInterface";
import { CardSelectionAnim } from "../../animations/Form/CardSelectVariant";
import { useFormikContext } from "formik";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";

const ItemSelect = ({
  title,
  subtitle,
  cover,
  select,
  onSelect = () => {},
  name = "",
}: ItemSelectProps) => {
  const [base, field] = name.split(".") || "";
  const context: any = useFormikContext<ApplicantModelProps>().values;

  const result =
    context && context[base] && context[base][field]
      ? context[base][field]
      : "";

  useEffect(() => {
    if (result) {
      onSelect(result);
    }

    return () => {
      onSelect("");
    };
  }, [onSelect, result]);

  return (
    <motion.label
      key={title}
      animate={CardSelectionAnim.animate({
        currVal: select || result,
        value: title,
      })}
      variants={CardSelectionAnim.variant}
      whileTap={{ scale: 0.9 }}
      className={`cursor-pointer min-w-[200px] min-h-[250px] border border-gray rounded-[5px] p-4 flex justify-center items-center flex-col gap-4 text-center shadow-lg `}
      onClick={() => onSelect(title)}>
      <Image
        src={cover}
        className="w-24 h-24 rounded-full border bg-blue-500"
        alt="cover"
      />
      <div>
        <Typography as="h4">{title}</Typography>
        <Typography as="small" className="opacity-50">
          {subtitle}
        </Typography>
      </div>
      {name && (
        <Radio className="hidden" name={name} id={title} value={title} />
      )}
    </motion.label>
  );
};

export default ItemSelect;
