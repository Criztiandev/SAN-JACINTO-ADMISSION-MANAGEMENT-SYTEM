/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import { useFormikContext } from "formik";
import CloseIcon from "../../assets/icons/Close_round_light.svg";
import DoneIcon from "../../assets/icons/Done_light.svg";

import { AnimatePresence, motion } from "framer-motion";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AcceptVariant, DeclineVariant } from "../../helper/Animation.Helper";
import {
  currentAddressInputModel,
  personalDetailsInputModel,
} from "../../data/Stepper.Data";
import SwitchButton from "./SwitchButton";
import IconButton from "../../components/IconButton";

const PermanentAddress = () => {
  const { setItems, getItem } = useLocalStorage("address_btn");
  const { isPermanent: isPerm, isCurrent: isCurr } = getItem();

  const [isPermanent, setIsPermanent] = useState(isPerm || false);
  const [isCurrent, setIsCurrent] = useState<boolean>(isCurr || false);

  const { values, setValues } = useFormikContext<ApplicantModelProps>();
  const { current } = values?.addressDetails || {
    permanent: "",
    current: "",
  };

  // Update the Prefered Choice
  const updatePermanentToCurrent = () => {
    setValues({
      ...values,
      addressDetails: {
        ...values.addressDetails,
        permanent: current,
      },
    });
  };

  const handlePermanentAddress = () => {
    updatePermanentToCurrent();
    setIsPermanent(true);
    setItems({ isPermanent: true, isCurrent: false });
  };

  const handleCurrentAddress = () => {
    setIsCurrent((prev) => !prev);
    setItems({ isPermanent: false, isCurrent: true });
  };

  FetchLocalStorageFormData("applicant_form");

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        {currentAddressInputModel.map((props) => (
          <motion.span key={props.label} whileHover={{ scale: 1.03 }}>
            <Input {...props} />
          </motion.span>
        ))}
      </div>

      <div className="my-4  flex flex-col gap-2 mb-4">
        <span>Is this your Permanent Address ?</span>
        <div className="flex gap-2">
          {!isCurrent && (
            <SwitchButton
              icon={DoneIcon}
              toggle={isPermanent}
              variant={AcceptVariant}
              color="#22f86275"
              onClick={handlePermanentAddress}
            />
          )}

          {!isPermanent && (
            <SwitchButton
              icon={CloseIcon}
              toggle={isCurrent}
              variant={DeclineVariant}
              color="#f8222275"
              onClick={handleCurrentAddress}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isCurrent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4">
            <div className="flex justify-between items-center mb-4 border-b py-2 border-gray-400">
              <Typography as="h4">Permanent Address</Typography>

              <div className="flex gap-4">
                <IconButton
                  as="outlined"
                  icon={CloseIcon}
                  onClick={() => {
                    setIsCurrent(false);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {personalDetailsInputModel.map((props) => (
                <motion.span key={props.label} whileHover={{ scale: 1.05 }}>
                  <Input {...props} />
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PermanentAddress;
