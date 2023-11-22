import Input from "../../components/Input";
import { useState } from "react";
import { useFormikContext } from "formik";

import { FetchLocalStorageFormData } from "../../helper/Stepper.Helper";
import IconButton from "../../components/IconButton";
import { ApplicantModelProps } from "../../interface/ApplicantMode.Type";
import CheckIcon from "../../assets/icons/Done_light.svg";
import CancelIcon from "../../assets/icons/Close_round_light.svg";

const OtherDetails = () => {
  FetchLocalStorageFormData("applicant_form");

  const { values, setValues } = useFormikContext<ApplicantModelProps>();
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [isIndigenous, setIsIndigenous] = useState(false);
  const [isLWD, setIsLWD] = useState(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setValues({
      ...values,
      otherDetails: {
        ...values.otherDetails,
        [fieldName]: value,
      },
    });
  };

  return (
    <section className="grid grid-cols-2 gap-8 items-start">
      <div>
        <h6 className="mb-4">Are you a 4ps beneficiary</h6>
        <div
          className={
            !isBeneficiary ? "flex gap-4" : "grid grid-cols-[1fr_64px] gap-4"
          }>
          {isBeneficiary ? (
            <Input
              name="otherDetails.is4psBeneficiary"
              placeholder="Please Specify"
            />
          ) : (
            <IconButton
              icon={CheckIcon}
              as="outlined"
              type="button"
              onClick={() => setIsBeneficiary(true)}
            />
          )}
          <div>
            <IconButton
              icon={CancelIcon}
              as="outlined"
              type="button"
              className={
                values?.otherDetails?.is4psBeneficiary === "NO" &&
                !isBeneficiary
                  ? "bg-[#22f86275]"
                  : "bg-none"
              }
              onClick={() => {
                handleInputChange("is4psBeneficiary", "NO");
                setIsBeneficiary(false);
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h6 className="mb-4">Are you an Indigenous People</h6>
        <div
          className={
            !isIndigenous ? "flex gap-4" : "grid grid-cols-[1fr_64px] gap-4"
          }>
          {isIndigenous ? (
            <Input
              name="otherDetails.isIndigenousPerson"
              placeholder="Please Type your tribe"
            />
          ) : (
            <IconButton
              icon={CheckIcon}
              as="outlined"
              type="button"
              onClick={() => setIsIndigenous(true)}
            />
          )}
          <div>
            <IconButton
              icon={CancelIcon}
              as="outlined"
              type="button"
              className={
                values?.otherDetails?.isIndigenousPerson === "NO" &&
                !isIndigenous
                  ? "bg-[#22f86275]"
                  : "bg-none"
              }
              onClick={() => {
                handleInputChange("isIndigenousPerson", "NO");
                setIsIndigenous(false);
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h6 className="mb-4">Are you a Learners with Disability</h6>
        <div
          className={!isLWD ? "flex gap-4" : "grid grid-cols-[1fr_64px] gap-4"}>
          {isLWD ? (
            <Input
              name="otherDetails.isLWD"
              placeholder="Please Specify the Disability"
            />
          ) : (
            <IconButton
              icon={CheckIcon}
              as="outlined"
              type="button"
              onClick={() => setIsLWD(true)}
            />
          )}
          <div>
            <IconButton
              icon={CancelIcon}
              as="outlined"
              type="button"
              className={
                values?.otherDetails?.isLWD === "NO" && !isLWD
                  ? "bg-[#22f86275]"
                  : "bg-none"
              }
              onClick={() => {
                handleInputChange("isLWD", "NO");
                setIsLWD(false);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherDetails;
