import { Field } from "formik";
import { motion } from "framer-motion";
import Typography from "../../components/Typography";

interface ExamineesCardProps {
  _id: string;
  name: string;
  track: string;
  schedule: string;
  status: string;
  permitID: string;
  disabled?: boolean;
  selected?: boolean;
}

const PromoteCard = ({ _id, ...props }: ExamineesCardProps) => {
  const { name, status, track, permitID, disabled } = props;
  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className="relative border border-gray-400 p-4 rounded-[5px] select-none w-full h-full">
      <div className="flex gap-4">
        {!disabled && <Field type="checkbox" name="selected" value={_id} />}
        <Typography as="h5">{name}</Typography>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex gap-2 mb-2">
          <span>🔼 Permit:</span>
          <span className="font-medium border px-3 rounded-full ">
            {permitID}
          </span>
        </div>

        <div className="flex gap-2 mb-2">
          <span>📚 Track:</span>
          <span className="font-medium border px-3 rounded-full ">{track}</span>
        </div>

        <div className="flex gap-2">
          <span>🟢Status:</span>
          <span className="font-medium border px-3 rounded-full ">
            {status}
          </span>
        </div>
      </div>
    </motion.label>
  );
};

export default PromoteCard;
