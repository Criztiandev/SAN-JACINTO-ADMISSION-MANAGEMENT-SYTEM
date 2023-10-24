import { motion } from "framer-motion";
import { Field } from "formik";

interface ExaminesItemsProps {
  _id: string;
  name: string;
  yearLevel: string;
  genAve: string;
  disabled: boolean;
}

const ExaminesItems = ({
  _id,
  name,
  yearLevel,
  genAve,
  disabled,
}: ExaminesItemsProps) => {
  return (
    <motion.label
      whileHover={{
        border: disabled ? "border 1px solid gray" : "1px solid black",
      }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      whileFocus={{ border: "2px solid black" }}
      className={`border rounded-[5px] p-4 w-[250px] flex flex-col gap-2 hover:cursor-pointer ${
        disabled && "border-gray-400 opacity-70"
      }`}>
      <div className="flex gap-2">
        {!disabled && <Field type="checkbox" name="batch" value={_id} />}
        <h6>{name}</h6>
      </div>

      <div>
        <div>{yearLevel}</div>
        <div>Gen: {genAve}</div>
      </div>
    </motion.label>
  );
};

export default ExaminesItems;
