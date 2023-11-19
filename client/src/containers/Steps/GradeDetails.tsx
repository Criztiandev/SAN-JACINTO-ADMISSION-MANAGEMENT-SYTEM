import Input from "../../components/Input";
import { gradeDetailsInputModel } from "../../data/Stepper.Data";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { motion } from "framer-motion";
const GradeDetails = () => {
  FetchLocalStorageFormData("applicant_form");
  return (
    <section className="grid grid-cols-2 gap-4">
      {gradeDetailsInputModel.map((props) => (
        <motion.div key={props.name} whileHover={{ scale: 1.03 }}>
          <Input {...props} />
        </motion.div>
      ))}
    </section>
  );
};

export default GradeDetails;
