import Button from "../components/Button";
import Typography from "../components/Typography";
import RegistrationSteps from "../containers/Steps/RegistrationSteps";
import useMultipleForm from "../hooks/useMultipleForm";
import RegistrationLayout from "../layouts/RegistrationLayout";
import { ReactElement } from "react";
import PrevIcon from "../assets/icons/Expand_left_light.svg";
import NextIcon from "../assets/icons/Expand_right_light.svg";
import { Form, Formik } from "formik";
import Input from "../components/Input";
import applicantSchema from "../schema/applicantSchema";

const Register = () => {
  const stepsComponent: ReactElement[] = [
    <RegistrationSteps>1</RegistrationSteps>,
    <RegistrationSteps>2</RegistrationSteps>,
    <RegistrationSteps>3</RegistrationSteps>,
    <RegistrationSteps>4</RegistrationSteps>,
  ];
  const { steps, currentIndex, isFirstStep, isLastStep, next, back } =
    useMultipleForm(stepsComponent);

  return (
    <RegistrationLayout>
      <section className="flex items-center justify-between ">
        <Typography as="h1">Grade Level</Typography>
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
          console.log({ values, actions });

          if (!isLastStep) next();
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        validationSchema={applicantSchema}>
        <Form className="flex  flex-col justify-between h-full">
          <div>
            <Input
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your First Name"
            />
          </div>

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
              as="submit"
              type="outlined"
              dir="right"
              icon={NextIcon}
              title={isLastStep ? "Finish" : "Next"}
            />
          </div>
        </Form>
      </Formik>
    </RegistrationLayout>
  );
};

export default Register;
