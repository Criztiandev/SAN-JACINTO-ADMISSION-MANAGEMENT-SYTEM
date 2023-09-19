import { ReactElement } from "react";
import { Form, Formik } from "formik";
import Button from "../components/Button";
import Typography from "../components/Typography";
import useMultipleForm from "../hooks/useMultipleForm";
import RegistrationLayout from "../layouts/RegistrationLayout";
import PrevIcon from "../assets/icons/Expand_left_light.svg";
import NextIcon from "../assets/icons/Expand_right_light.svg";
import applicantSchema from "../schema/applicantSchema";
import { applicantInitialValue } from "../models/applicantModel";

import GradeLevel from "../containers/Steps/GradeLevel";
import AccountDetails from "../containers/Steps/AccountDetails";
import StudentDetails from "../containers/Steps/StudentDetails";
import PersonalDetails from "../containers/Steps/PersonalDetails";
import PermanentAddress from "../containers/Steps/PermanentAddress";
import GuardianDetails from "../containers/Steps/GuardianDetails";
import OtherDetails from "../containers/Steps/OtherDetails";
import CheckPoint from "../containers/Steps/CheckPoint";
import ApplicationForm from "../containers/Steps/ApplicationForm";
import Outro from "../containers/Steps/Outro";
const registrationPanels: string[] = [
  "Grade Level",
  "Student Details",
  "Personal Details",
  "Permanent Address",
  "Guardian Details",
  "Other Details",
  "Account Details",
  "Checkpoint",
  "Application Form",
  "Thank You",
];

const Register = () => {
  const registrationStepsComponents: ReactElement[] = [
    <GradeLevel />,
    <StudentDetails />,
    <PersonalDetails />,
    <PermanentAddress />,
    <GuardianDetails />,
    <OtherDetails />,
    <AccountDetails />,
    <CheckPoint />,
    <ApplicationForm />,
    <Outro />,
  ];
  const { steps, currentIndex, isFirstStep, isLastStep, next, back } =
    useMultipleForm(registrationStepsComponents);

  return (
    <RegistrationLayout activePanel={registrationPanels[currentIndex]}>
      <section className="flex items-center justify-between">
        <Typography as="h1">{registrationPanels[currentIndex]}</Typography>
        <span>
          {currentIndex + 1} / {registrationStepsComponents.length}
        </span>
      </section>

      <Formik
        initialValues={applicantInitialValue}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
          // console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          // actions.setSubmitting(false);
        }}
        validationSchema={applicantSchema}>
        <Form className="flex flex-col justify-between h-full">
          {steps}

          <div className="flex justify-between items-center">
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
              type="outlined"
              dir="right"
              icon={NextIcon}
              title={isLastStep ? "Finish" : "Next"}
              onClick={next}
            />
          </div>
        </Form>
      </Formik>
    </RegistrationLayout>
  );
};

export default Register;
