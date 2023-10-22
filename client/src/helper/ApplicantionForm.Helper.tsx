/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { CardProps, InputProps } from "../interface/FormInterface";
import {
  ApplicantModelProps,
  ApplicationFormModelProps,
} from "../interface/ApplicantMode.Type";
import { OmitInputObject } from "../utils/OmitUtils";
import {
  GradeLevel,
  GradeDetails,
  StudentDetails,
  PersonalDetails,
  PermanentAddress,
  GuardianDetails,
  OtherDetails,
  ApplicationForm,
} from "../containers/Steps";
import { StepperProps } from "../interface/Registration.Type";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFormikContext } from "formik";
import { useEffect } from "react";

import MaleProfile from "../assets/image/Male_profile.png";
import FemaleProfile from "../assets/image/Female_Profile.png";
import { ItemSelectProps } from "../interface/FormInterface";

export const JrTracksItemModel: CardProps[] = [
  { cover: "null", title: "Regular", subtitle: "Regular Student" },
  { cover: "null", title: "SPE", subtitle: "Regular" },
  { cover: "null", title: "SPJ", subtitle: "Special Journalism" },
];

export const SHSTracksItemModel: CardProps[] = [
  { cover: "null", title: "GAS", subtitle: "Regular Student" },
  { cover: "null", title: "STEM", subtitle: "Regular" },
  { cover: "null", title: "ABM", subtitle: "Special Journalism" },
];

export const yearLevelsItemModel: CardProps[] = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

export const suffixes: Array<string> = [
  "Jr.",
  "Sr.",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];

export const studenDetailsInputModel: InputProps[] = [
  {
    label: "General Average",
    name: "studentDetails.generalAverage",
  },
  {
    label: "LRN",
    name: "studentDetails.LRN",
    placeholder: "Enter your LRN",
  },
  {
    label: "PSA Ref#",
    name: "studentDetails.PSA",
    placeholder: "Enter your PSA Reference",
  },
  {
    label: "Year Level",
    name: "studentDetails.yearLevel",
    placeholder: "Enter your Year level",
  },

  {
    label: "Track",
    name: "studentDetails.track",
    placeholder: "Enter your Track",
  },

  {
    label: "School Year",
    name: "studentDetails.schoolYear",
    placeholder: "Enter your School Year",
  },

  {
    label: "Last School Attended",
    name: "studentDetails.lastSchoolAttended",
    placeholder: "Enter your School Last Attended",
  },
];

export const personalDetailsInputModel: InputProps[] = [
  {
    label: "First Name",
    name: `personalDetails.firstName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Middle Name",
    name: `personalDetails.middleName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Last Name",
    name: `personalDetails.lastName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Suffix",
    name: `personalDetails.suffix`,
    placeholder: "Enter your Suffix",
  },

  {
    label: "Gender",
    name: `personalDetails.gender`,
    placeholder: "Enter your Suffix",
  },

  {
    type: "date",
    label: "Birth Date",
    name: "personalDetails.birthDate",
  },
  {
    type: "number",
    label: "Age",
    name: "personalDetails.age",
    placeholder: "Enter your Age",
  },
  {
    type: "email",
    label: "Email",
    name: "personalDetails.email",
    placeholder: "Enter your @email",
  },

  {
    type: "number",
    label: "Contact",
    name: "personalDetails.contact",
    placeholder: "Enter your phone number",
  },

  {
    type: "string",
    label: "Facebook Link",
    name: "personalDetails.facebookLink",
    placeholder: "Enter your facebook link",
  },

  {
    label: "Mother Tounge",
    name: "personalDetails.motherTounge",
    placeholder: "Enter",
  },
];

export const currentAddressInputModel: InputProps[] = [
  {
    label: "House No.",
    name: `addressDetails.current.houseNo`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Street",
    name: `addressDetails.current.street`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Barangay",
    name: `addressDetails.current.barangay`,
    placeholder: "Enter your Barangay",
  },

  {
    label: "Municipality",
    name: `addressDetails.current.municipality`,
    placeholder: "Enter your Municipality",
  },

  {
    label: "Province",
    name: `addressDetails.current.province`,
    placeholder: "Enter your Province",
  },

  {
    label: "Country",
    name: `addressDetails.current.country`,
    placeholder: "Enter your Country",
  },

  {
    label: "Zip Code",
    name: `addressDetails.current.zip`,
    placeholder: "Enter your Zip Code",
  },
];

export const permanentAddressInputModel: InputProps[] = [
  {
    label: "House No.",
    name: `addressDetails.permanent.houseNo`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Street",
    name: `addressDetails.permanent.street`,
    placeholder: `Enter your House number`,
  },
  {
    label: "Barangay",
    name: `addressDetails.permanent.barangay`,
    placeholder: "Enter your Barangay",
  },

  {
    label: "Municipality",
    name: `addressDetails.permanent.municipality`,
    placeholder: "Enter your Municipality",
  },

  {
    label: "Province",
    name: `addressDetails.permanent.province`,
    placeholder: "Enter your Province",
  },

  {
    label: "Country",
    name: `addressDetails.permanent.country`,
    placeholder: "Enter your Country",
  },

  {
    label: "Zip Code",
    name: `addressDetails.permanent.zip`,
    placeholder: "Enter your Zip Code",
  },
];

export const fatherInputDetails: InputProps[] = [
  {
    label: "First Name",
    name: "guardianDetails.father.firstName",
    placeholder: "Enter your father's Details",
  },
  {
    label: "Middle Name",
    name: "guardianDetails.father.middleName",
    placeholder: "Enter your father's Details",
  },
  {
    label: "Last Name",
    name: "guardianDetails.father.lastName",
    placeholder: "Enter your fahter's details",
  },
  {
    label: "Contact ",
    name: "guardianDetails.father.contact",
    placeholder: "Enter your fahter's details",
  },
];

export const motherInputDetails: InputProps[] = [
  {
    label: "First Name",
    name: "guardianDetails.mother.firstName",
    placeholder: "Enter tour mother's First name",
  },
  {
    label: "Middle Name",
    name: "guardianDetails.mother.middleName",
    placeholder: "Enter tour mother's Middle name",
  },
  {
    label: "Last Name",
    name: "guardianDetails.mother.lastName",
    placeholder: "Enter your mother's Last name",
  },
  {
    label: "Contact ",
    name: "guardianDetails.mother.contact",
    placeholder: "Enter your mother's Contact",
  },
];

export const legalGuardianInputDetails: InputProps[] = [
  {
    label: "First Name",
    name: "guardianDetails.legalGuardian.firstName",
    placeholder: "Enter tour Guardian's First name",
  },
  {
    label: "Middle Name",
    name: "guardianDetails.legalGuardian.middleName",
    placeholder: "Enter tour Guardian's Middle name",
  },
  {
    label: "Last Name",
    name: "guardianDetails.legalGuardian.lastName",
    placeholder: "Enter your Guardian's Last name",
  },
  {
    label: "Contact ",
    name: "guardianDetails.legalGuardian.contact",
    placeholder: "Enter your Guardian's Contact",
  },
];

export const otherInputDetails: InputProps[] = [
  { label: "4ps Beneficiary", name: "otherDetails.is4psBeneficiary" },
  { label: "Indigenous People", name: "otherDetails.isIndigenousPerson" },
  { label: "Learners With Disability", name: "otherDetails.isLWD" },
];

export const ApplicationFormInputProps: ApplicationFormModelProps[] = [
  { title: "Student Details", model: studenDetailsInputModel },
  { title: "Personal Details", model: personalDetailsInputModel },
  { title: "Current Address Details", model: currentAddressInputModel },
  { title: "Permanent Address Details", model: personalDetailsInputModel },
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
  { title: "Guardians", model: legalGuardianInputDetails },
  { title: "Other Details", model: otherInputDetails },
];

// Application Form Model
export const ApplicationFormInputModel: ApplicationFormModelProps[] = [
  {
    title: "Student Details",
    model: OmitInputObject(["Year Level"], studenDetailsInputModel),
  },
  {
    title: "Personal Details",
    model: OmitInputObject(["Suffix"], personalDetailsInputModel),
  },

  {
    title: "Current Address",
    model: currentAddressInputModel,
  },

  {
    title: "Permanent Address",
    model: permanentAddressInputModel,
  },

  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
  { title: "Guardian", model: legalGuardianInputDetails },

  { title: "Other Details", model: otherInputDetails },
];

export const OtherInputData: InputProps[] = [
  {
    label: "Are you a 4ps Beneficiary ?",
    name: `otherDetails.is4psBeneficiary`,
    placeholder: "Enter your Reference #",
  },

  {
    label: "Are you a Indigenous Person ?",
    name: `otherDetails.isIndigenousPerson`,
    placeholder: "Please Specify",
  },

  {
    label: "Are you a LWD Person ?",
    name: `otherDetails.isLWD`,
    placeholder: "Please Specify",
  },
];

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

export const OutroDetails = [
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

export const GenderSelectionItems = [
  { cover: MaleProfile, title: "Male", subtitle: "Masculine" },
  { cover: FemaleProfile, title: "Female", subtitle: "Feminine" },
];

export const GuadianChoices: ItemSelectProps[] = [
  { cover: "null", title: "Father", subtitle: "Strong" },
  { cover: "null", title: "Mother", subtitle: "Caring" },
  { cover: "null", title: "Other", subtitle: "Prefered" },
];

export const GuardianInputs: ApplicationFormModelProps[] = [
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
];

export const gradeDetails: InputProps[] = [
  { label: "English", name: "gradeDetails.english" },
  { label: "Science", name: "gradeDetails.science" },
  { label: "Filipino", name: "gradeDetails.filipino" },
  { label: "Math", name: "gradeDetails.math" },
  { label: "General Average", name: "gradeDetails.generalAve" },
];

// Functions

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

// Modified Data
export const PersonalDetailsFirstSection: InputProps[] = OmitInputObject(
  [
    "Suffix",
    "Birth Date",
    "Age",
    "Email",
    "Contact",
    "Facebook Link",
    "Mother Tounge",
    "Gender",
  ],
  personalDetailsInputModel
);

export const PersonalDetailsSectionSection: InputProps[] = OmitInputObject(
  ["First Name", "Middle Name", "Last Name", "Suffix", "Gender"],
  personalDetailsInputModel
);
