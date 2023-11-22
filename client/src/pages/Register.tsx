/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  OutroModalDetails,
  RegistrationStepper,
} from "../helper/Admission.Helper";
import useMultipleForm from "../hooks/useMultipleForm";
import useModal from "../hooks/useModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { preferedValidationSchema } from "../schema/applicant.Schema";
import useFormSubmit from "../hooks/useFormSubmit";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (!applicantStorage.getItem()) {
      applicantStorage.setItems(applicantInitialValue);
    }

    if (!addressStorage.getItem()) {
      addressStorage.setItems({ isPermanent: false, isCurr: false });
    }
  }, []);

  // Handling Submit
  const handleSubmit = async (
    values: ApplicantModelProps,
    action: FormikHelpers<ApplicantModelProps>
  ) => {
    const { isLastStep, nextStep } = multiStep;

    if (!isLastStep) {
      applicantStorage.setItems(values);
      return nextStep();
    }

    toast.info("Please Wait a second");
    mutationSubmit(values, action);
  };

  const {
    handleSubmit: mutationSubmit,
    isThrottled,
    isPending,
  } = useFormSubmit({
    route: "/applicant/create",
    overideFn: () => {
      outroModal.showModal();
      applicantStorage.removeItem();
      addressStorage.removeItem();
    },
    type: "post",
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
            <RegistrationAction
              stepper={multiStep}
              isThrottled={isThrottled || isPending || false}
            />
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
