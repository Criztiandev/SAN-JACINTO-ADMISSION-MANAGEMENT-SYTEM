import { Form, Formik, FormikHelpers } from "formik";
import { Button, Typography } from "../components/index";

import RegistrationLayout from "../layouts/RegistrationLayout";
import useMultipleForm from "../hooks/useMultipleForm";

import { NextIcon, PrevIcon } from "../assets/icons";

import applicantTemplate from "../models/applicantModel";
import { ApplicantModelInterface } from "../interface/applicantModelInterface";

import {
  GradeLevel,
  StudentDetails,
  PermanentAddress,
  PersonalDetails,
  GuardianDetails,
  OtherDetails,
  AccountDetails,
  ApplicationForm,
  Outro,
} from "../containers/Steps";
import { panelTemplate } from "../interface/registrationInterface";

const registrationPanels: panelTemplate[] = [
  { title: "Grade Level", component: <GradeLevel /> },
  { title: "Student Details", component: <StudentDetails /> },
  { title: "Personal Details", component: <PersonalDetails /> },
  { title: "Permanent Address", component: <PermanentAddress /> },
  { title: "Guardian Details", component: <GuardianDetails /> },
  { title: "Other Details", component: <OtherDetails /> },
  { title: "Facebook Account", component: <AccountDetails /> },
  { title: "Application Form", component: <ApplicationForm /> },
  { title: "Thank you", component: <Outro /> },
];

const Register = () => {
  // Use a custom hook to manage form steps and navigation
  const { steps, currentIndex, isFirstStep, isLastStep, next, back } =
    useMultipleForm(registrationPanels.map(items => items.component));

  // // Formik Submission Handler
  const handleSubmit = async (
    values: ApplicantModelInterface,
    actions: FormikHelpers<ApplicantModelInterface>
  ) => {
    console.log(values);
    console.log(actions);

    actions.resetForm();
  };

  return (
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

          <div
            className={`flex items-center ${
              isFirstStep ? "justify-end" : "justify-between"
            }`}>
            {!isFirstStep && (
              <Button
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
              onClick={next}
            />
          </div>
        </Form>
      </Formik>
    </RegistrationLayout>
  );
};

export default Register;
