/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Image, Radio, Typography } from "../../components";
import { ItemSelectProps } from "../../interface/FormInterface";
import { CardSelectionAnim } from "../../animations/Form/CardSelectVariant";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { ApplicantModelInterface } from "../../interface/applicantModelInterface";

const ItemSelect = ({
  title,
  subtitle,
  cover,
  select,
  onSelect = () => {},
  name,
}: ItemSelectProps) => {
  const { studentDetails } = useFormikContext<ApplicantModelInterface>().values;
  const yearLevel = studentDetails.yearLevel;

  useEffect(() => {
    if (yearLevel) {
      onSelect(yearLevel);
    }

    return () => {
      onSelect("");
    };
  }, [onSelect, yearLevel]);

  return (
    <motion.label
      key={title}
      animate={CardSelectionAnim.animate({ currVal: select, value: title })}
      variants={CardSelectionAnim.variant}
      whileTap={{ scale: 0.9 }}
      className={`cursor-pointer min-w-[200px] min-h-[250px] border border-gray rounded-[5px] p-4 flex justify-center items-center flex-col gap-4 text-center shadow-lg `}
      onClick={() => onSelect(title)}>
      <Image
        src={cover}
        className="w-24 h-24 rounded-full border bg-blue-500"
      />
      <div>
        <Typography as="h4">{title}</Typography>
        <Typography as="small" className="opacity-50">
          {subtitle}
        </Typography>
      </div>
      {name && <Radio name={name} id={title} value={title} />}
    </motion.label>
  );
};

export default ItemSelect;
