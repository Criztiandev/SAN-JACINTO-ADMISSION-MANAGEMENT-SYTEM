import { Form, Formik, FormikHelpers } from "formik";
import { Button, IconButton, Typography } from "../components/index";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { NextIcon, PrevIcon } from "../assets/icons";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

import { useNavigate } from "react-router-dom";
import applicantInitialValue from "../data/initialValue/applicantInit";
import { OutroDetails } from "../helper/registrationForm.Helper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createApplicant } from "../api/applicant.api";
import { RegistrationStepper } from "../helper/Registration.Helper";
import useModal from "../hooks/useModal";
import OutroModal from "../containers/Steps/OutroModal";

RegistrationStepper;

const Register = () => {
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

  const { mutateAsync } = useMutation({
    mutationKey: ["createApplicant"], // Optional, give your mutation a key
    mutationFn: async (data: ApplicantModelProps) => {
      const result = await createApplicant(data);
      return result; // Return the variables for later use
    },
  });

  const navigate = useNavigate();

  // Reset Everything
  const Reset = () => {
    hideModal();
    resetFormIndex();
    handleResetModalIndex();
    navigate("/");
    // navigate to landing page but not able to go back here
  };

  // Handle Next Button for Modal
  const handleNext = () => {
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
    if (!isLastStep) return next();
    handleQuery(values, actions);
  };

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
                <IconButton />

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
              <OutroModal data={modalData[modalIndex]} onNext={handleNext} />
            )}
          </Form>
        </Formik>
      </RegistrationLayout>
    </>
  );
};

export default Register;
