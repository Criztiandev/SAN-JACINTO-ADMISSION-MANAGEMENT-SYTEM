import { ReactElement } from "react";
import { Form, Formik } from "formik";
import Button from "../components/Button";
import Typography from "../components/Typography";
import useMultipleForm from "../hooks/useMultipleForm";
import RegistrationLayout from "../layouts/RegistrationLayout";
import PrevIcon from "../assets/icons/Expand_left_light.svg";
import NextIcon from "../assets/icons/Expand_right_light.svg";
import applicantSchema from "../schema/applicantSchema";
import Registration from "../containers/Registration";

const Panels = [
  "Grade Level",
  "Student Details",
  "Pesonal Details",
  "Permanent Address",
  "Guardian Details",
  "Other Details",
  "Account Details",
  "Checkpoint",
  "Application Form",
  "Thank you",
];

const Register = () => {
  const stepsComponent: ReactElement[] = [
    <Registration.Steps.GradeLevel />,
    <Registration.Steps.StudentDetails />,
    <Registration.Steps.PersonalDetails />,
    <Registration.Steps.PermanentAddress />,
    <Registration.Steps.GuardianDetails />,
    <Registration.Steps.OtherDetails />,
    <Registration.Steps.AccountDetails />,
    <Registration.Steps.CheckPoint />,
    <Registration.Steps.ApplicationForm />,
    <Registration.Steps.Outro />,
  ];
  const { steps, currentIndex, isFirstStep, isLastStep, next, back } =
    useMultipleForm(stepsComponent);

  return (
    <RegistrationLayout panels={Panels[currentIndex]}>
      <section className="flex items-center justify-between ">
        <Typography as="h1">{Panels[currentIndex]}</Typography>
        <span>
          {currentIndex + 1} / {stepsComponent.length}
        </span>
      </section>

      <Formik
        initialValues={{
          firstName: "",
          middleName: "",
          lastName: "",
        }}
        onSubmit={(values, actions) => {
          // console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          // actions.setSubmitting(false);
        }}
        validationSchema={applicantSchema}>
        <Form className="flex  flex-col justify-between h-full">
          {steps}

          <div className="flex  justify-between items-center">
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
              as="button"
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
