import { useEffect } from "react";
import Input from "../../components/Input";
import { gradeDetailsInputModel } from "../../data/Stepper.Data";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const GradeDetails = () => {
  FetchLocalStorageFormData("applicant_form");

  useEffect(() => {
    toast.info(
      "❗ Tips: 👋 Make sure to follow all the Red message to proceeed '",
      { theme: "colored" }
    );
  }, []);
  return (
    <section className="grid grid-cols-2 gap-4">
      {gradeDetailsInputModel.map((props) => (
        <motion.div key={props.name} whileHover={{ scale: 1.03 }}>
          <Input type="number" {...props} />
        </motion.div>
      ))}
    </section>
  );
};

export default GradeDetails;
