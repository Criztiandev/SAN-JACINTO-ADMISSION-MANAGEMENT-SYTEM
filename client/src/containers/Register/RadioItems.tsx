/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { cardSelection } from "../../animations/variants/selectionVariants";
import { Radio, Typography } from "../../components";

interface RadioItemsProps {
  title: string;
  subtitle?: string;
  state?: number | string | any;
  index?: number | string | any;
  handleSelect?: () => void;
  name?: string;
  className?: string;
}

const RadioItems = ({
  title,
  subtitle,
  state,
  index,
  handleSelect,
  name,
  className,
}: RadioItemsProps) => {
  return (
    <motion.label
      key={title}
      animate={cardSelection.animate({ state, index })}
      variants={cardSelection.variant}
      whileTap={{ scale: 0.9 }}
      className={`cursor-pointer min-w-[200px] min-h-[250px] border border-gray rounded-[5px] p-4 flex justify-center items-center flex-col gap-4 text-center shadow-lg ${
        className && className
      }`}
      onClick={handleSelect}>
      <div className="w-24 h-24 rounded-full border bg-blue-500"></div>
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

export default RadioItems;
