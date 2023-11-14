import { Field } from "formik";
import { motion } from "framer-motion";
interface BatchCardProps {
  UID: string;
  title: string;
  description: string;
  disabled?: boolean;
}

const BatchCard = ({ UID, title, description, disabled }: BatchCardProps) => {
  // create a query that find the batch details, like title and description only

  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className={`bg-gray-100 border p-4 rounded-[5px]`}>
      <div className="flex gap-4 items-start">
        {!disabled && <Field type="checkbox" name="batches" value={UID} />}
        <h5 className="mb-2">{title}</h5>
      </div>
      <p>{description}</p>
    </motion.label>
  );
};

export default BatchCard;
