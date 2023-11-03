/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik, FormikHelpers } from "formik";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

import { useNavigate } from "react-router-dom";
import applicantInitialValue from "../data/initialValue/applicantInit";
import { useMutation } from "@tanstack/react-query";
import { createApplicant } from "../api/Applicant.Api";
import useModal from "../hooks/useModal";
import OutroModal from "../containers/Steps/OutroModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import {
  OutroDetails,
  RegistrationStepper,
} from "../helper/ApplicantionForm.Helper";
import RegistrationHeader from "../containers/Admission/RegistrationHeader";
import RegistrationAction from "../containers/Admission/RegistrationAction";
import {
  handleQuery,
  handleRegistrationReset,
} from "../helper/Admission.Helpter";
import { toast } from "react-toastify";

const Register = () => {
  const { setItems, getItem } = useLocalStorage("applicant_form");

  // Outro Modal
  const outroModal = useModal({ data: OutroDetails });
  const {
    data: modalData,
    currentIndex: modalIndex,
    active: isActiveModal,
    isLastIndex,
    handleNext: handleNextIndex,
  } = outroModal;
  // Form Stepper
  const multiStep = useMultipleForm(
    RegistrationStepper.map(({ component }) => component)
  );
  const { steps, currentIndex } = multiStep;

  // Mutation Query
  const { mutateAsync } = useMutation({
    mutationKey: ["createApplicant"], // Optional, give your mutation a key
    mutationFn: async (data: ApplicantModelProps) => {
      const result = await createApplicant(data);
      return result; // Return the variables for later use
    },

    onSuccess: () => {
      outroModal.showModal();
      toast.success("Applicant Send Succssfully");
    },
    onError: () => {
      toast.error("Something went wrong, Please Try Again");
    },
  });

  // navigation
  const navigate = useNavigate();

  // Handle Next Button for Modal
  const handleNextModal = () => {
    if (isLastIndex)
      handleRegistrationReset(outroModal, multiStep.resetIndex, navigate);
    return handleNextIndex();
  };

  const handleSubmit = async (
    values: ApplicantModelProps,
    actions: FormikHelpers<ApplicantModelProps>
  ) => {
    if (!multiStep.isLastStep) {
      setItems(values);
      return multiStep.nextStep();
    }
    handleQuery(values, mutateAsync);
    actions.resetForm();
  };

  useEffect(() => {
    if (!getItem()) {
      setItems(applicantInitialValue);
    }
  }, []);

  return (
    <>
      <RegistrationLayout activePanel={"Title"}>
        <RegistrationHeader steps={currentIndex} />

        <Formik initialValues={applicantInitialValue} onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-between h-full">
            {steps}

            <RegistrationAction stepper={multiStep} />
          </Form>
        </Formik>
      </RegistrationLayout>

      {isActiveModal && (
        <OutroModal data={modalData[modalIndex]} onNext={handleNextModal} />
      )}
    </>
  );
};

export default Register;
