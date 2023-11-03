/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

import RegistrationLayout from "../layouts/RegistrationLayout";
import { useMultipleForm, useModal, useLocalStorage } from "../hooks";

import applicantInitialValue from "../data/initialValue/applicantInit";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import OutroModal from "../containers/Steps/OutroModal";

import {
  RegistrationHeader,
  RegistrationAction,
} from "../containers/Admission";
import {
  handleApplicantMutation,
  handleNextModal,
  handleQuery,
  OutroModalDetails,
  RegistrationStepper,
} from "../helper/Admission.Helper";

const Register = () => {
  const navigate = useNavigate();

  // Local Storage
  const applicantStorage = useLocalStorage("applicant_form");
  const addressStorage = useLocalStorage("address_btn");
  const { getItem, setItems } = applicantStorage;

  // Outro Modal
  const outroModal = useModal({ data: OutroModalDetails });
  const { data: modalData } = outroModal;

  // Form Stepper
  const componentPackage = RegistrationStepper.map(
    ({ component: Component }) => <Component />
  ); // Unpackage
  const multiStep = useMultipleForm(componentPackage);
  const { Steps, currentIndex } = multiStep;

  // Handling Submit
  const handleSubmit = async (values: ApplicantModelProps) => {
    if (!multiStep.isLastStep) {
      setItems(values);
      return multiStep.nextStep();
    }
    handleQuery(values, mutateAsync);
  };

  useEffect(() => {
    if (!getItem()) {
      setItems(applicantInitialValue);
    }

    return () => {
      applicantStorage.removeItem();
      addressStorage.removeItem();
    };
  }, []);

  // Mutation Query
  const { mutateAsync } = useMutation({
    mutationFn: handleApplicantMutation,
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

        <Formik initialValues={applicantInitialValue} onSubmit={handleSubmit}>
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
