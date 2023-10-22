import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  fatherInputDetails,
  legalGuardianInputDetails,
  motherInputDetails,
} from "../../helper/applicantFormObject";
import {
  ApplicantModelProps,
  ApplicationFormModelProps,
} from "../../interface/ApplicantMode.Type";
import { InputProps } from "../../interface/FormInterface";
import { motion } from "framer-motion";
import CopyIcon from "../../assets/icons/Copy_alt_light.svg";
import EraseIcon from "../../assets/icons/Erase.svg";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Button, IconButton } from "../../components";
import { FetchLocalStorageFormData } from "../../helper/Registration.Helper";

const GuardianInputs: ApplicationFormModelProps[] = [
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
];

const GuardianDetails = () => {
  FetchLocalStorageFormData("applicant_form");
  const { values, setValues } = useFormikContext<ApplicantModelProps>();
  const { father, mother } = values.guardianDetails;
  const [selectedGuardian, setSelectedGuardian] = useState("");

  const updateGuardianDetails = () => {
    setValues({
      ...values,
      guardianDetails: {
        ...values.guardianDetails,
        legalGuardian:
          selectedGuardian === "Father"
            ? father
            : selectedGuardian === "Mother"
            ? mother
            : { firstName: "", middleName: "", lastName: "", contact: "" },
      },
    });
  };

  useEffect(() => {
    if (selectedGuardian) {
      updateGuardianDetails();
    }

    return () => {
      setSelectedGuardian("");
    };
  }, [selectedGuardian]);
  return (
    <section>
      {GuardianInputs.map(({ title, model }) => (
        <motion.div key={title} className="mb-8">
          <Typography as="h5" className="pb-2  border-b mb-4">
            {title}
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            {model.map((props: InputProps) => (
              <motion.div whileHover={{ scale: 1.03 }}>
                <Input key={props.label} {...props} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div className="mb-8 ">
        <div className="flex justify-between items-center pb-2  border-b mb-4">
          <Typography as="h5" className="">
            Guardian Details
          </Typography>

          <div className="flex gap-4">
            <Button
              icon={CopyIcon}
              dir="left"
              type="outlined"
              className="bg-transparent text-black border-gray-400"
              title="Father"
              onClick={() => setSelectedGuardian("Father")}
            />
            <Button
              icon={CopyIcon}
              dir="left"
              type="outlined"
              className="bg-transparent text-black border-gray-400"
              title="Mother"
              onClick={() => setSelectedGuardian("Mother")}
            />

            <IconButton
              onClick={() => setSelectedGuardian("legal")}
              icon={EraseIcon}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {legalGuardianInputDetails.map((props: InputProps) => (
            <motion.div whileHover={{ scale: 1.03 }}>
              <Input key={props.label} {...props} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GuardianDetails;
