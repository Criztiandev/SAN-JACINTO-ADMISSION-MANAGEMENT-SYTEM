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
