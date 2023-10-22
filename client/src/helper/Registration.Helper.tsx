import { useEffect } from "react";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

import {
  GradeLevel,
  GradeDetails,
  GuardianDetails,
  StudentDetails,
  PermanentAddress,
  PersonalDetails,
  OtherDetails,
  ApplicationForm,
} from "../containers/Steps";
import { StepperProps } from "../interface/Registration.Type";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFormikContext } from "formik";

export const RegistrationStepper: StepperProps[] = [
  { title: "Grade Level", component: <GradeLevel /> },
  { title: "Grade Details", component: <GradeDetails /> },
  { title: "Student Details", component: <StudentDetails /> },
  { title: "Personal Details", component: <PersonalDetails /> },
  { title: "Current Address", component: <PermanentAddress /> },
  { title: "Guardian Details", component: <GuardianDetails /> },
  { title: "Other Details", component: <OtherDetails /> },
  { title: "Application Form", component: <ApplicationForm /> },
];

export const FetchLocalStorageFormData = (name: string) => {
  const { getItem, setItems } = useLocalStorage(name);
  const { values, setValues } = useFormikContext<ApplicantModelProps>();

  useEffect(() => {
    // if there is no instance then create one
    if (!getItem()) {
      setItems(values || []);
    }

    // there is instance store it
    setValues(getItem() || values);

    return () => {
      setValues(values);
    };
  }, []);
};
