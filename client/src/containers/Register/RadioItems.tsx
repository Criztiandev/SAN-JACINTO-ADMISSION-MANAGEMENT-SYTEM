/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Radio from "../../components/Radio";
import Typography from "../../components/Typography";

interface RadioItemsProps {
  title: string;
  subtitle?: string;
  state?: number | string | any;
  select: string;
  onSelect?: () => void;
  name?: string;
  className?: string;
}

const RadioItems = ({ title, subtitle, onSelect, name }: RadioItemsProps) => {
  return (
    <motion.label
      key={title}
      className={`cursor-pointer min-w-[200px] min-h-[250px] border border-gray rounded-[5px] p-4 flex justify-center items-center flex-col gap-4 text-center shadow-lg `}
      onClick={onSelect}>
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
