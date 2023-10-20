import { CardProps, InputProps } from "../interface/FormInterface";
import { ApplicationFormModelProps } from "../interface/ApplicantMode.Type";
import { OmitInputObject } from "../utils/OmitUtils";

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

export const fatherInputDetails: InputProps[] = [
  {
    label: "Father's First Name",
    name: "guardianDetails.father.firstName",
    placeholder: "Enter your father Details",
  },
  {
    label: "Father's Middle Name",
    name: "guardianDetails.father.middleName",
    placeholder: "Enter your father Details",
  },
  {
    label: "Father's Last Name",
    name: "guardianDetails.father.lastName",
    placeholder: "Enter your fahter details",
  },
  {
    label: "Father's Contact ",
    name: "guardianDetails.father.contact",
    placeholder: "Enter your fahter details",
  },
];

export const motherInputDetails: InputProps[] = [
  {
    label: "Mother's First Name",
    name: "guardianDetails.mother.firstName",
    placeholder: "Enter tour Mother's First name",
  },
  {
    label: "Mother's Middle Name",
    name: "guardianDetails.mother.middleName",
    placeholder: "Enter tour Mother's Middle name",
  },
  {
    label: "Mother's Last Name",
    name: "guardianDetails.mother.lastName",
    placeholder: "Enter your Mother's Last name",
  },
  {
    label: "Mother's Contact ",
    name: "guardianDetails.mother.contact",
    placeholder: "Enter your Mother's Contact",
  },
];

export const legalGuardianInputDetails: InputProps[] = [
  {
    label: "Legal Guardian's First Name",
    name: "guardianDetails.legalGuardian.firstName",
    placeholder: "Enter tour Legal Guardian's First name",
  },
  {
    label: "Legal Guardian's Middle Name",
    name: "guardianDetails.legalGuardian.middleName",
    placeholder: "Enter tour Legal Guardian's Middle name",
  },
  {
    label: "Legal Guardian's Last Name",
    name: "guardianDetails.legalGuardian.lastName",
    placeholder: "Enter your Legal Guardian's Last name",
  },
  {
    label: "Legal Guardian's Contact ",
    name: "guardianDetails.legalGuardian.contact",
    placeholder: "Enter your Legal Guardian's Contact",
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
  { title: "Legal Guardians", model: legalGuardianInputDetails },
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
  { title: "Legal Guardian", model: legalGuardianInputDetails },

  { title: "Other Details", model: otherInputDetails },
];
