import { Input } from "../../components";
import {
  FetchLocalStorageFormData,
  gradeDetails,
} from "../../helper/ApplicantionForm.Helper";
import { motion } from "framer-motion";

const GradeDetails = () => {
  FetchLocalStorageFormData("applicant_form");
  return (
    <section className="grid grid-cols-2 gap-4">
      {gradeDetails.map(props => (
        <motion.div whileHover={{ scale: 1.03 }}>
          <Input key={props.label} {...props} />
        </motion.div>
      ))}
    </section>
  );
};

export default GradeDetails;
