import { Form, Formik, FormikHelpers } from "formik";
import { Button, IconButton, Typography } from "../components/index";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { NextIcon, PrevIcon, ResetIcon } from "../assets/icons";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

import { useNavigate } from "react-router-dom";
import applicantInitialValue from "../data/initialValue/applicantInit";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createApplicant } from "../api/applicant.api";
import useModal from "../hooks/useModal";
import OutroModal from "../containers/Steps/OutroModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import {
  OutroDetails,
  RegistrationStepper,
} from "../helper/ApplicantionForm.Helper";

const Register = () => {
  const {
    removeItem: FormRemove,
    setItems,
    getItem,
  } = useLocalStorage("applicant_form");
  const { removeItem: AddressRemove } = useLocalStorage("address_btn");

  // Modal
  const {
    data: modalData,
    currentIndex: modalIndex,

    active: isActiveModal,
    showModal,
    hideModal,
    lastIndex,
    handleNext: handleNextIndex,
    handleResetIndex: handleResetModalIndex,
  } = useModal({ data: OutroDetails });

  // Form Stepper
  const {
    steps,
    next,
    back,
    isFirstStep,
    isLastStep,
    resetIndex: resetFormIndex,
    currentIndex,
  } = useMultipleForm(RegistrationStepper.map(({ component }) => component));

  // Mutation Query
  const { mutateAsync } = useMutation({
    mutationKey: ["createApplicant"], // Optional, give your mutation a key
    mutationFn: async (data: ApplicantModelProps) => {
      const result = await createApplicant(data);
      return result; // Return the variables for later use
    },
  });

  // navigation
  const navigate = useNavigate();

  // fomik

  // Reset Everything
  const Reset = () => {
    hideModal();
    resetFormIndex();
    handleResetModalIndex();
    navigate("/");
  };

  // Handle Next Button for Modal
  const handleNextModal = () => {
    if (lastIndex) Reset();
    return handleNextIndex();
  };

  const handleQuery = async (
    values: ApplicantModelProps,
    actions: FormikHelpers<ApplicantModelProps>
  ) => {
    try {
      await mutateAsync(values);
      toast.success("Applicant Sent Successfully");
      showModal();
      actions.resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const responseError = error.response.data;
      toast.error(responseError.message);
    }
  };

  const handleSubmit = async (
    values: ApplicantModelProps,
    actions: FormikHelpers<ApplicantModelProps>
  ) => {
    if (!isLastStep) {
      setItems(values);
      return next();
    }
    handleQuery(values, actions);
  };

  useEffect(() => {
    if (!getItem()) {
      setItems(applicantInitialValue);
    }
  }, []);

  return (
    <>
      <RegistrationLayout activePanel={RegistrationStepper[currentIndex].title}>
        <section className="flex items-center justify-between border-b p-2">
          <Typography as="h3" className="font-semibold">
            {RegistrationStepper[currentIndex].title}
          </Typography>
          <span>
            {currentIndex + 1} / {RegistrationStepper.length}
          </span>
        </section>

        <Formik initialValues={applicantInitialValue} onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-between h-full">
            {steps}

            <div
              className={`flex items-center ${
                isFirstStep ? "justify-end" : "justify-between"
              }`}>
              {!isFirstStep && (
                <Button
                  as="button"
                  type="outlined"
                  dir="left"
                  icon={PrevIcon}
                  title="Prev"
                  onClick={back}
                />
              )}

              <div className="flex gap-4">
                <IconButton
                  icon={ResetIcon}
                  onClick={() => {
                    FormRemove();
                    AddressRemove();
                  }}
                />

                <Button
                  as="submit"
                  type="outlined"
                  dir="right"
                  icon={NextIcon}
                  title={`${isLastStep ? "Finish" : "Next"}`}
                />
              </div>
            </div>

            {isActiveModal && (
              <OutroModal
                data={modalData[modalIndex]}
                onNext={handleNextModal}
              />
            )}
          </Form>
        </Formik>
      </RegistrationLayout>
    </>
  );
};

export default Register;
