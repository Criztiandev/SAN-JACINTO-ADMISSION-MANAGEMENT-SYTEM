import { motion } from "framer-motion";
import { Field } from "formik";

const ExaminesItems = ({ _id, name, yearLevel, genAve }: any) => {
  return (
    <motion.label
      whileHover={{ border: "1px solid black" }}
      whileTap={{ scale: 0.9 }}
      whileFocus={{ border: "2px solid black" }}
      className="border rounded-[5px] p-4 w-[250px] flex flex-col gap-2 hover:cursor-pointer">
      <div className="flex gap-2">
        <Field type="checkbox" name="batch" value={_id} />
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
