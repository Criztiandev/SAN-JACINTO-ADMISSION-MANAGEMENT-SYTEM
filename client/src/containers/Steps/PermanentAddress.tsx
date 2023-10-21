import { useState } from "react";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  currentAddressInputModel,
  permanentAddressInputModel,
} from "../../helper/applicantFormObject";
import { useFormikContext } from "formik";
import { IconButton } from "../../components";
import CloseIcon from "../../assets/icons/Close_round_light.svg";
import DoneIcon from "../../assets/icons/Done_light.svg";

import { AnimatePresence, motion } from "framer-motion";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";

const AcceptVariant = {
  selected: {
    border: "1px solid green",
    background: "#22f86275",
  },
};

const DeclineVariant = {
  selected: {
    border: "1px solid red",
    background: "#f8222275",
  },
  unselected: {
    border: "",
    background: "none",
  },
};

const PermanentAddress = () => {
  const [isPermanent, setIsPermanent] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  const { values, setValues } = useFormikContext<ApplicantModelProps>();
  const { current } = values?.addressDetails || {
    permanent: "",
    current: "",
  };

  const updatePermanentToCurrent = () => {
    setValues({
      ...values,
      addressDetails: {
        ...values.addressDetails,
        permanent: current,
      },
    });
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        {currentAddressInputModel.map(props => (
          <motion.span key={props.label} whileHover={{ scale: 1.03 }}>
            <Input {...props} />
          </motion.span>
        ))}
      </div>

      <div className="my-4  flex flex-col gap-2 mb-4">
        <span>Is this your Permanent Address ?</span>
        <div className="flex gap-2">
          {!isCurrent && (
            <motion.button
              type="button"
              animate={isPermanent && "selected"}
              variants={AcceptVariant}
              disabled={isPermanent}
              whileTap={{ scale: 0.7 }}
              className="border rounded-full  hover:border-green-600 hover:bg-[#22f86275]"
              onClick={() => {
                updatePermanentToCurrent();
                setIsPermanent(true);
              }}>
              <img src={DoneIcon} alt="Done" className="p-2" />
            </motion.button>
          )}

          {!isPermanent && (
            <motion.button
              type="button"
              animate={isCurrent ? "selected" : "unselected"}
              disabled={isCurrent}
              variants={DeclineVariant}
              whileTap={{ scale: 0.7 }}
              className="border rounded-full hover:border-red-500 hover:bg-[#f8222275]"
              onClick={() => {
                setIsCurrent(prev => !prev);
              }}>
              <img src={CloseIcon} alt="close" className="p-2" />
            </motion.button>
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
                  type="outlined"
                  icon={CloseIcon}
                  onClick={() => {
                    setIsCurrent(false);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {permanentAddressInputModel.map(props => (
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
