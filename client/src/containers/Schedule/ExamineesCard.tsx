import { Field } from "formik";
import { motion } from "framer-motion";

interface ExamineesCardProps {
  _id: string;
  name: string;
  yearLevel: string;
  track: string;
  ave: string;
  disabled?: boolean;
}

const ExamineesCard = ({
  _id,
  name,
  yearLevel,
  track,
  ave,
  disabled,
}: ExamineesCardProps) => {
  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className="relative border p-4 rounded-[5px] select-none">
      <div className="absolute bottom-2 right-2  border rounded-full w-[38px] h-[38px] flex justify-center items-center bg-green-300">
        {ave}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 items-start">
          {!disabled && <Field type="checkbox" name="examiniees" value={_id} />}
          <span className="font-semibold">{name}</span>
        </div>
      </div>

      <div className="flex gap-1 flex-col mt-2">
        <span>Level: {yearLevel}</span>
        <span>Track: {track}</span>
      </div>
    </motion.label>
  );
};

export default ExamineesCard;
