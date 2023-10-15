import {
  Address,
  AddressDetails,
  ApplicantModelInterface,
  Guardian,
  GuardianDetails,
  OtherDetails,
  PersonalDetails,
  StudentDetails,
  applicantInputMapsInterface,
} from "../interface/applicantModelInterface";

const addressTemplate: Address = {
  houseNo: "91",
  street: "Rawis",
  barangay: "Poblacion",
  municipality: "Batuan",
  province: "Masbate",
  country: "Phillipines",
  zip: "5400",
};

// Define reusable guardian object
const guardianTemplate: Guardian = {
  firstName: "Mareflor",
  middleName: "Mitra",
  lastName: "Tuplano",
  contact: "0948828485",
};

const studentDetails: StudentDetails = {
  LRN: "192193123",
  PSA: "123123123",
  yearLevel: "Grade 12",
  track: "Regular",
  schoolYear: "2023-2024",
  lastSchoolAttended: "Nazareth Institute of Alfonzo",
};

const personalDetails: PersonalDetails = {
  firstName: "Criztian Jade",
  middleName: "Mitra",
  lastName: "Tuplano",
  suffix: "",
  gender: "Male",
  birthDate: "05/07/01",
  age: 22,
  motherTounge: "Filipino",
  email: "criztiandev@gmail.com",
  contact: "09482004868",
  facebookLink: "https://www.facebook.com/criztiandev07",
};

const addressDetails: AddressDetails = {
  permanent: { ...addressTemplate },
  current: { ...addressTemplate },
};

const guardianDetails: GuardianDetails = {
  father: { ...guardianTemplate },
  mother: { ...guardianTemplate },
  legalGuardian: { ...guardianTemplate },
};

const otherDetails: OtherDetails = {
  is4psBeneficiary: "No",
  isIndigenousPerson: "No",
  isLWD: "No",
};

const applicantTemplate: ApplicantModelInterface = {
  studentDetails,
  personalDetails,
  addressDetails,
  guardianDetails,
  otherDetails,
};

export const applicantInputMaps: applicantInputMapsInterface[] = [
  {
    title: "Student Details",
    details: [
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
    ],
  },

  {
    title: "Personal Details",
    details: [
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
    ],
  },

  // current address
  {
    title: "Current Address",
    details: [
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
    ],
  },

  // Permanent address
  {
    title: "Permanent Address",
    details: [
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
    ],
  },

  {
    title: "Fathers Details",
    details: [
      {
        label: "Father's First Name",
        name: "guardianDetails.father.firstName",
      },
      {
        label: "Father's Middle Name",
        name: "guardianDetails.father.middleName",
      },
      { label: "Father's Last Name", name: "guardianDetails.father.lastName" },
      { label: "Father's Contact ", name: "guardianDetails.father.contact" },
    ],
  },

  {
    title: "Mother's Details",
    details: [
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
    ],
  },

  {
    title: "Legal Guardian's Details",
    details: [
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
    ],
  },

  {
    title: "Other Details",
    details: [
      { label: "4ps Beneficiary", name: "otherDetails.is4psBeneficiary" },
      { label: "Indigenous People", name: "otherDetails.isIndigenousPerson" },
      { label: "Learners With Disability", name: "otherDetails.isLWD" },
    ],
  },
];

export default applicantTemplate;
