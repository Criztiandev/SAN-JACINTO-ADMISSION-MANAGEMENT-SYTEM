import { Field } from "formik";
import { motion } from "framer-motion";
interface BatchCardProps {
  _id: string;
  title: string;
  schedule: string;
  examiniees: number | string;
  disabled?: boolean;
  status?: string;
}

const BatchCard = ({
  _id,
  title,
  schedule,
  examiniees,
  disabled,
}: BatchCardProps) => {
  // create a query that find the batch details, like title and description only

  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className={`border p-4 rounded-[5px] shadow-md border-gray-400`}>
      <div className="flex gap-4 items-start">
        {!disabled && <Field type="checkbox" name="batches" value={_id} />}
        <h5 className="mb-2">{title}</h5>
      </div>

      <div className="flex gap-2">
        <span>📅:</span>
        {schedule === null ? "Not specified" : schedule}
      </div>

      <div className="flex gap-2">
        <span>👥:</span>
        {examiniees}
      </div>
    </motion.label>
  );
};

export default BatchCard;
