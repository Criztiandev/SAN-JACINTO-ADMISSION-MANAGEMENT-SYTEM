import { CardProps, InputProps } from "../interface/FormInterface";
import { OmitInputObject } from "../utils/OmitUtils";
import { ApplicationFormModelProps } from "../interface/ApplicantMode.Type";
// import { MaleProfile, FemaleProfile } from "../assets/image";
import MaleProfile from "../assets/image/Male_profile.png";
import FemaleProfile from "../assets/image/Female_Profile.png";
import { ItemSelectProps } from "../interface/FormInterface";

export const JrTracksItemModel: CardProps[] = [
  { cover: "null", title: "Regular", subtitle: "Regular" },
  {
    cover: "null",
    title: "SPE",
    subtitle: "Special Program of Science and Technology",
  },
  { cover: "null", title: "SPJ", subtitle: "Special Program for Journalism" },
];

export const SHSTracksItemModel: CardProps[] = [
  { cover: "null", title: "GAS", subtitle: "General Academic Strand" },
  {
    cover: "null",
    title: "STEM",
    subtitle: "Science, Technology, Engineering, and Mathematics",
  },
  {
    cover: "null",
    title: "ABM",
    subtitle: "Accountancy Business Management",
  },

  {
    cover: "null",
    title: "EIM",
    subtitle: "Electrical Installation and Maintenance",
  },

  {
    cover: "null",
    title: "ICT",
    subtitle: "Information Communication and Technology",
  },

  {
    cover: "null",
    title: "BPP",
    subtitle: "Bread and Pastry Production ",
  },
];

export const yearLevelItem: CardProps[] = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

export const suffixes: Array<string> = [
  "N/A",
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

export const gradeDetailsInputModel: InputProps[] = [
  {
    label: "English",
    name: "gradeDetails.english",
    placeholder: "Enter your English Grades",
  },
  {
    label: "Filipino",
    name: "gradeDetails.filipino",
    placeholder: "Enter your Filipino Grades",
  },
  {
    label: "Science",
    name: "gradeDetails.science",
    placeholder: "Enter your Science Grades",
  },
  {
    label: "Math",
    name: "gradeDetails.math",
    placeholder: "Enter your Math Grades",
  },
  {
    label: "General Weighted Average",
    name: "gradeDetails.generalAve",
    placeholder: "Enter your GWA",
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
    type: "text",
    label: "Religion",
    name: "personalDetails.religion",
    placeholder: "Enter your religion",
  },

  {
    type: "string",
    label: "Facebook Link",
    name: "personalDetails.facebookLink",
    placeholder: "Enter your facebook link",
  },

  {
    label: "Mother Tongue",
    name: "personalDetails.motherTongue",
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
    type: "number",
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
    type: "number",
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

export const ApplicationFormInputProps: ApplicationFormModelProps[] = [
  { title: "Student Details", model: studenDetailsInputModel },
  { title: "Personal Details", model: personalDetailsInputModel },
  { title: "Current Address Details", model: currentAddressInputModel },
  { title: "Permanent Address Details", model: personalDetailsInputModel },
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
  { title: "Guardians", model: legalGuardianInputDetails },
  { title: "Other Details", model: OtherInputData },
];

// Application Form Model
export const ApplicationFormInputModel: ApplicationFormModelProps[] = [
  {
    title: "Student Details",
    model: OmitInputObject(["Year Level"], studenDetailsInputModel),
  },

  { title: "Grade Details", model: gradeDetailsInputModel },
  {
    title: "Personal Details",
    model: OmitInputObject(["Suffix"], personalDetailsInputModel),
  },
  { title: "Current Address", model: currentAddressInputModel },
  { title: "Permanent Address", model: permanentAddressInputModel },
  { title: "Father Details", model: fatherInputDetails },
  { title: "Mother Details", model: motherInputDetails },
  { title: "Guardian", model: legalGuardianInputDetails },
  { title: "Other Details", model: OtherInputData },
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
  { title: "Mother' Maiden Details", model: motherInputDetails },
];

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
    "Mother Tongue",
    "Religion",
  ],
  personalDetailsInputModel
);

export const PersonalDetailsSectionSection: InputProps[] = OmitInputObject(
  ["First Name", "Middle Name", "Last Name", "Suffix", "Gender"],
  personalDetailsInputModel
);
