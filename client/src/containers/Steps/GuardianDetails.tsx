/* eslint-disable react-hooks/exhaustive-deps */
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import { InputProps } from "../../interface/FormInterface";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import {
  GuardianInputs,
  legalGuardianInputDetails,
} from "../../data/Stepper.Data";
import Dropdown from "../../components/Dropdown";

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
              <motion.div key={props.label} whileHover={{ scale: 1.03 }}>
                <Input {...props} />
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
            <Dropdown
              type="button"
              title="Prefered Guardian"
              onClick={(e) => setSelectedGuardian(e.currentTarget.value)}
              className="p-4"
              option={[
                { title: "Father", icon: "" },
                { title: "Mother", icon: "" },
                { title: "Reset", icon: "" },
              ]}
            />
            {/* <IconButton
              icon={FatherIcon}
              as="outlined"
              onClick={() => setSelectedGuardian("Father")}
            />
            <IconButton
              icon={MotherIcon}
              as="outlined"
              onClick={() => setSelectedGuardian("Mother")}
            />
            <IconButton
              icon={ResetIcon}
              as="outlined"
              onClick={() => setSelectedGuardian("Reset")}
            /> */}
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
