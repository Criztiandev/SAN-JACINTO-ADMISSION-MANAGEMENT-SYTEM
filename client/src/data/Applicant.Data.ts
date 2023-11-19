import ApplicantIcon from "../assets/icons/Applicant_Dark.svg";
import { OptionItem } from "../interface/Component.Type";

export const PersoanlDetailsNameInput = [
  { name: "personalDetails.lastName" },
  { name: "personalDetails.firstName" },
  { name: "personalDetails.middleName" },
  { name: "personalDetails.suffix" },
];

export const GradeOptions: OptionItem[] = [
  { icon: ApplicantIcon, title: "Grade 7" },
  { icon: ApplicantIcon, title: "Grade 8" },
  { icon: ApplicantIcon, title: "Grade 9" },
  { icon: ApplicantIcon, title: "Grade 10" },
  { icon: ApplicantIcon, title: "Grade 11" },
  { icon: ApplicantIcon, title: "Grade 12" },
];

export const StatusItems: OptionItem[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Pending", icon: ApplicantIcon },
  { title: "Hold", icon: ApplicantIcon },
];
