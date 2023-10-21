import { Form, Formik, FormikHelpers } from "formik";
import { Button, Typography } from "../components/index";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { NextIcon, PrevIcon } from "../assets/icons";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

import {
  GradeLevel,
  StudentDetails,
  PermanentAddress,
  PersonalDetails,
  GuardianDetails,
  OtherDetails,
  ApplicationForm,
} from "../containers/Steps";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import applicantInitialValue from "../data/initialValue/applicantInit";
import { OutroDetails } from "../helper/registrationFormHelper";
import { StepperProps } from "../interface/Registration.Type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationStepper: StepperProps[] = [
  { title: "Grade Level", component: <GradeLevel /> },
  { title: "Student Details", component: <StudentDetails /> },
  { title: "Personal Details", component: <PersonalDetails /> },
  { title: "Current Address", component: <PermanentAddress /> },
  { title: "Guardian Details", component: <GuardianDetails /> },
  { title: "Other Details", component: <OtherDetails /> },
  { title: "Application Form", component: <ApplicationForm /> },
];

const Register = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const { steps, currentIndex, isLastStep, isFirstStep, next, back, goto } =
    useMultipleForm(RegistrationStepper.map(items => items.component));
  const Ended = index === OutroDetails.length - 1;
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async data =>
      axios.post("http://localhost:4000/api/applicant/create", data),
  });

  const handleNext = () => {
    if (Ended) {
      setActive(false);
      setIndex(-1);
      goto(0);
      navigate("/");
    }

    return setIndex(prev =>
      prev >= OutroDetails.length - 1 ? prev : prev + 1
    );
  };

  const handleQuery = async (values: ApplicantModelProps) => {
    try {
      await mutateAsync(values);
      toast.success("Applicant Sent Successfully");
      setActive(true);
    } catch (error) {
      const { message } = error?.response.data;
      toast.error(message);
    }
  };

  // // Formik Submission Handler
  const handleSubmit = async (
    values: ApplicantModelProps,
    actions: FormikHelpers<ApplicantModelProps>
  ) => {
    if (!isLastStep) return next();

    handleQuery(values);
    actions.resetForm();
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
                  as="submit"
                  type="outlined"
                  dir="left"
                  icon={PrevIcon}
                  title="Prev"
                  onClick={back}
                />
              )}
              <Button
                as="submit"
                type="outlined"
                dir="right"
                icon={NextIcon}
                title={`${isLastStep ? "Finish" : "Next"}`}
              />
            </div>

            {active && (
              <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center ">
                <div className="w-[600px] h-[400px] bg-white rounded-[5px] p-4 flex justify-center items-center flex-col gap-4">
                  <div className="w-[120px] h-[120px] border rounded-full bg-blue-400"></div>

                  <div className="text-center max-w-[400px]">
                    <h2>{OutroDetails[index]?.title}</h2>
                    <p>{OutroDetails[index]?.desc}</p>
                  </div>
                  <Button as="button" title="Next" onClick={handleNext} />
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </RegistrationLayout>
    </>
  );
};

export default Register;
