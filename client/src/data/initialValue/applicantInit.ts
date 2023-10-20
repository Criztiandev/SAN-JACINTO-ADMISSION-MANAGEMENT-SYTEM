import {
  AddressBaseProps,
  AddressDetailsProps,
  ApplicantModelProps,
  GuardianDetailsProps,
  NameBaseProps,
  OtherDetailsProps,
  PersonalDetailsProps,
  StudentDetailsProps,
} from "../../interface/ApplicantMode.Type";

const addressTemplate: AddressBaseProps = {
  houseNo: "91",
  street: "Rawis",
  barangay: "Poblacion",
  municipality: "Batuan",
  province: "Masbate",
  country: "Phillipines",
  zip: "5400",
};

// Define reusable guardian object
const guardianTemplate: NameBaseProps = {
  firstName: "Mareflor",
  middleName: "Mitra",
  lastName: "Tuplano",
  contact: "0948828485",
};

const studentDetails: StudentDetailsProps = {
  LRN: "192193123",
  PSA: "123123123",
  yearLevel: "Grade 12",
  track: "Regular",
  schoolYear: "2023-2024",
  lastSchoolAttended: "Nazareth Institute of Alfonzo",
};

const personalDetails: PersonalDetailsProps = {
  firstName: "Criztian Jade",
  middleName: "Mitra",
  lastName: "Tuplano",
  suffix: "",
  gender: "Male",
  birthDate: "",
  age: 22,
  motherTounge: "Filipino",
  email: "criztiandev@gmail.com",
  contact: "09482004868",
  facebookLink: "https://www.facebook.com/criztiandev07",
};

const addressDetails: AddressDetailsProps = {
  permanent: { ...addressTemplate },
  current: { ...addressTemplate },
};

const guardianDetails: GuardianDetailsProps = {
  father: { ...guardianTemplate },
  mother: { ...guardianTemplate },
  legalGuardian: { ...guardianTemplate },
};

const otherDetails: OtherDetailsProps = {
  is4psBeneficiary: "No",
  isIndigenousPerson: "No",
  isLWD: "No",
};

const applicantInitialValue: ApplicantModelProps = {
  studentDetails,
  personalDetails,
  addressDetails,
  guardianDetails,
  otherDetails,
};

export default applicantInitialValue;
