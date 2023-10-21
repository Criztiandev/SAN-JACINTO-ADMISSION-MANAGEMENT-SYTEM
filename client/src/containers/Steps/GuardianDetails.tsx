import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  fatherInputDetails,
  legalGuardianInputDetails,
  motherInputDetails,
} from "../../helper/applicantFormObject";
import { ApplicationFormModelProps } from "../../interface/ApplicantMode.Type";
import { InputProps } from "../../interface/FormInterface";
import { motion } from "framer-motion";

const GuardianInputs: ApplicationFormModelProps[] = [
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
  { title: "Guardian Details", model: legalGuardianInputDetails },
];

const GuardianDetails = () => {
  return (
    <section>
      {GuardianInputs.map(({ title, model }) => (
        <motion.div whileHover={{ scale: 1.03 }} key={title} className="mb-8">
          <Typography as="h5" className="pb-2  border-b mb-4">
            {title}
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            {model.map((props: InputProps) => (
              <Input key={props.label} {...props} />
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default GuardianDetails;
