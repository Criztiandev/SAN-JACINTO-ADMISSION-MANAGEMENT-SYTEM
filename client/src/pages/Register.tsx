/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

import RegistrationLayout from "../layouts/RegistrationLayout";
// import { useMultipleForm, useModal, useLocalStorage } from "../hooks";
import applicantInitialValue from "../data/initialValue/applicantInit";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import OutroModal from "../containers/Steps/OutroModal";

import {
  RegistrationHeader,
  RegistrationAction,
} from "../containers/Admission";
import {
  handleNextModal,
  handleQuery,
  OutroModalDetails,
  RegistrationStepper,
} from "../helper/Admission.Helper";
import useMultipleForm from "../hooks/useMultipleForm";
import useModal from "../hooks/useModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { preferedValidationSchema } from "../schema/applicant.Schema";

const Register = () => {
  const navigate = useNavigate();

  // Local Storage
  const applicantStorage = useLocalStorage("applicant_form");
  const addressStorage = useLocalStorage("address_btn");

  // Outro Modal
  const outroModal = useModal({ data: OutroModalDetails });
  const { data: modalData } = outroModal;

  // Form Stepper
  const componentUnpackage = RegistrationStepper.map(
    ({ component: Component }) => <Component />
  ); // Unpackage
  const multiStep = useMultipleForm(componentUnpackage);
  const { Steps, currentIndex } = multiStep;

  // Handling Submit
  const handleSubmit = async (values: ApplicantModelProps) => {
    try {
      const { isLastStep, nextStep } = multiStep;

      if (!isLastStep) {
        console.log("Test");
        applicantStorage.setItems(values);
        return nextStep();
      }

      // if its the last page
      handleQuery(values, mutateAsync);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (!applicantStorage.getItem()) {
      applicantStorage.setItems(applicantInitialValue);
    }

    if (!addressStorage.getItem()) {
      addressStorage.setItems({ isPermanent: false, isCurr: false });
    }

    // return () => {
    //   applicantStorage.removeItem();
    //   addressStorage.removeItem();
    // };
  }, []);

  // Mutation Query
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return "";
    },
    mutationKey: ["createApplicant"], // Optional, give your mutation a key
    onSuccess: () => {
      outroModal.showModal();
      toast.success("Applicant Send Succssfully");
    },
    onError: () => {
      toast.error("Something went wrong, Please Try Again");
    },
  });

  return (
    <>
      <RegistrationLayout activePanel={"Title"}>
        <RegistrationHeader steps={currentIndex} />

        <Formik
          initialValues={applicantInitialValue}
          onSubmit={handleSubmit}
          validationSchema={() => preferedValidationSchema(`${currentIndex}`)}>
          <Form className="flex flex-col justify-between h-full">
            {Steps}
            <RegistrationAction stepper={multiStep} />
          </Form>
        </Formik>
      </RegistrationLayout>

      {outroModal.active && (
        <OutroModal
          data={modalData[outroModal.currentIndex]}
          onNext={() =>
            handleNextModal(outroModal, multiStep.resetIndex, navigate)
          }
        />
      )}
    </>
  );
};

export default Register;
