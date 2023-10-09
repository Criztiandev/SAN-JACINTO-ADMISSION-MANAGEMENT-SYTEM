import {
  Account,
  Address,
  AddressDetails,
  ApplicantModelInterface,
  Guardian,
  GuardianDetails,
  OtherDetails,
  PersonalDetails,
  SchoolDetails,
  StudentDetails,
  applicantInputMapsInterface,
} from "../interface/applicantModelInterface";

const addressTemplate: Address = {
  houseNo: "",
  street: "",
  barangay: "",
  municipality: "",
  province: "",
  country: "",
  zip: "",
};

// Define reusable guardian object
const guardianTemplate: Guardian = {
  firstName: "",
  middleName: "",
  lastName: "",
  contact: "",
};

const studentDetails: StudentDetails = {
  LRN: "",
  PSA: "",
  yearLevel: "",
  track: "",
  schoolYear: "",
  lastSchoolAttended: "",
};

const personalDetails: PersonalDetails = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  gender: "",
  birthDate: "",
  age: 0,
  motherTounge: "",
  email: "",
  contact: "",
};

const accountDetails: Account = {
  facebook: "",
};

const addressDetails: AddressDetails = {
  permanent: { ...addressTemplate },
  current: { ...addressTemplate },
};

const schoolDetails: SchoolDetails = {
  ID: "",
  name: "",
  contact: "",
};

const guardianDetails: GuardianDetails = {
  father: { ...guardianTemplate },
  mother: { ...guardianTemplate },
  legalGuardian: { ...guardianTemplate },
  choosen: "",
};

const otherDetails: OtherDetails = {
  is4psBeneficiary: "No",
  isIndigenousPerson: "No",
  isLWD: "No",
};

const applicantTemplate: ApplicantModelInterface = {
  studentDetails,
  schoolDetails,
  personalDetails,
  addressDetails,
  guardianDetails,
  otherDetails,
  accountDetails,
};

export const applicantInputMaps: applicantInputMapsInterface[] = [
  {
    title: "Student Details",
    details: [
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
        label: "School Year",
        name: "studentDetails.schoolYear",
        placeholder: "Enter your School Year",
      },

      {
        label: "Last School Attended",
        name: "studentDetails.lastSchoolAttended",
        placeholder: "Enter your School Last Attended",
      },
    ],
  },

  {
    title: "Personal Details",
    details: [
      { label: "Gender", name: "gender" },
      { label: "Birth Date", name: "birthDate" },
      { label: "Age", name: "age" },
      { label: "Mother Tounge", name: "MOT" },
    ],
  },

  {
    title: "Permanent Address",
    details: [
      { label: "House No.", name: "address.houseNo" },
      { label: "Street", name: "address.street" },
      { label: "Barangay", name: "address.brgy" },
      { label: "Municipality", name: "address.municipality" },
      { label: "Province", name: "address.province" },
      { label: "Country", name: "address.country" },
      { label: "Zip Code", name: "address.ZipCode" },
    ],
  },

  {
    title: "Guardian Details",
    details: [
      { label: "Father's Name", name: "guardian.fathersName" },
      { label: "Mother's Maided Name", name: "guardian.mothersName" },
      { label: "Legal Guardian's Name", name: "guardian.legalGuardians" },
      { label: "Legal Guardian's Contact", name: "guardian.contact" },
    ],
  },

  {
    title: "Other Details",
    details: [
      { label: "4ps Beneficiary", name: "others.beneficiary" },
      { label: "Indigenous People", name: "others.indigenous" },
      { label: "Learners With Disability", name: "others.LWD" },
    ],
  },

  {
    title: "Account Details",
    details: [
      { label: "Facebook", name: "account.facebook" },
      { label: "Gmail", name: "account.gmail" },
      { label: "Contact", name: "account.contact" },
    ],
  },
];

export default applicantTemplate;
