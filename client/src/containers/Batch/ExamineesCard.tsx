import { Field } from "formik";
import { motion } from "framer-motion";
import Typography from "../../components/Typography";

interface ExamineesCardProps {
  _id: string;
  name: string;
  yearLevel: string;
  track: string;
  ave: string;
  disabled?: boolean;
  selected?: boolean;
}

const ExamineesCard = ({ _id, ...props }: ExamineesCardProps) => {
  const { name, yearLevel, track, ave, disabled } = props;
  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className="relative border border-gray-400 p-4 rounded-[5px] select-none w-full h-full">
      <div className="flex gap-4">
        {!disabled && (
          <>
            {props.selected ? (
              <Field type="checkbox" name="examiniees" value={_id} checked />
            ) : (
              <Field type="checkbox" name="examiniees" value={_id} />
            )}
          </>
        )}
        <Typography as="h5">{name}</Typography>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex gap-2 mb-2">
          <span>🔼 Grade:</span>
          <span className="font-medium border px-3 rounded-full ">
            {yearLevel?.split(" ")[1]}
          </span>
        </div>

        <div className="flex gap-2 mb-2">
          <span>📚 Track:</span>
          <span className="font-medium border px-3 rounded-full ">{track}</span>
        </div>

        <div className="flex gap-2">
          <span>🧠 Gen Ave:</span>
          <span className="font-medium border px-3 rounded-full ">{ave}%</span>
        </div>
      </div>
    </motion.label>
  );
};

export default ExamineesCard;
