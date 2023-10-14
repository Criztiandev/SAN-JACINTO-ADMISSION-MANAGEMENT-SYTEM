import { Form, Formik, FormikHelpers } from "formik";
import { Button, Typography } from "../components/index";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { NextIcon } from "../assets/icons";

import applicantTemplate from "../models/applicantModel";
import { ApplicantModelInterface } from "../interface/applicantModelInterface";

import {
  GradeLevel,
  StudentDetails,
  PermanentAddress,
  PersonalDetails,
  GuardianDetails,
  OtherDetails,
  ApplicationForm,
} from "../containers/Steps";
import { panelTemplate } from "../interface/registrationInterface";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const registrationPanels: panelTemplate[] = [
  { title: "Grade Level", component: <GradeLevel /> },
  { title: "Student Details", component: <StudentDetails /> },
  { title: "Personal Details", component: <PersonalDetails /> },
  { title: "Current Address", component: <PermanentAddress /> },
  { title: "Guardian Details", component: <GuardianDetails /> },
  { title: "Other Details", component: <OtherDetails /> },
  { title: "Application Form", component: <ApplicationForm /> },
];

const OutroDetails = [
  {
    title: "Congratulations",
    desc: " Thank you on your admission to our school! Your examination schedule has been sent to your Facebook account.",
  },

  {
    title: "Exciting Journey",
    desc: "  As you embark on this exciting journey, please keep in mind that your registered Facebook account will serve as the primary channel for receiving all school updates.",
  },

  {
    title: "Stay Tuned",
    desc: " Stay connected to stay informed about events and important announcements. If you ever have any questions, don't hesitate to use your private account to get in touch. We're here to support you every step of the way!",
  },
];

const Register = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(-1);
  const { steps, currentIndex, isLastStep, next } = useMultipleForm(
    registrationPanels.map(items => items.component)
  );

  const Ended = index === OutroDetails.length - 1;
  const navigate = useNavigate();

  const handleNext = () => {
    if (Ended) {
      setActive(false);
    }

    return setIndex(prev =>
      prev >= OutroDetails.length - 1 ? prev : prev + 1
    );
  };

  const handleQuery = (values: ApplicantModelInterface) => {
    if (index !== OutroDetails.length - 1) {
      setActive(true);
      return;
    }

    alert(values);
    navigate("/");
  };

  // // Formik Submission Handler
  const handleSubmit = async (
    values: ApplicantModelInterface,
    actions: FormikHelpers<ApplicantModelInterface>
  ) => {
    if (!isLastStep) return next();
    if (!Ended) {
      setActive(true);
      return handleNext();
    }

    handleQuery(values);
  };

  return (
    <>
      <RegistrationLayout activePanel={registrationPanels[currentIndex].title}>
        <section className="flex items-center justify-between border-b p-2">
          <Typography as="h3" className="font-semibold">
            {registrationPanels[currentIndex].title}
          </Typography>
          <span>
            {currentIndex + 1} / {registrationPanels.length}
          </span>
        </section>

        <Formik initialValues={applicantTemplate} onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-between h-full">
            {steps}

            <div className={`flex items-center justify-end`}>
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
                    <h2>{OutroDetails[index].title}</h2>
                    <p>{OutroDetails[index].desc}</p>
                  </div>

                  <Button as="submit" title="Next" />
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
