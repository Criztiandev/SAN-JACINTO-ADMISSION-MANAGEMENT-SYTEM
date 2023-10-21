import { Input } from "../../components";
import { InputProps } from "../../interface/FormInterface";
import { motion } from "framer-motion";

const gradeDetails: InputProps[] = [
  { label: "English", name: "gradeDetails.english" },
  { label: "Science", name: "gradeDetails.science" },
  { label: "Filipino", name: "gradeDetails.filipino" },
  { label: "Math", name: "gradeDetails.math" },
  { label: "General Average", name: "gradeDetails.generalAve" },
];

const GradeDetails = () => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {gradeDetails.map(props => (
        <motion.div whileHover={{ scale: 1.03 }}>
          <Input {...props} />
        </motion.div>
      ))}
    </section>
  );
};

export default GradeDetails;
