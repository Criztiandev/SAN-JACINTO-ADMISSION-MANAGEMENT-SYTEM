import {
  AddressBaseProps,
  AddressDetailsProps,
  ApplicantModelProps,
  GradeDetails,
  GuardianDetailsProps,
  NameBaseProps,
  OtherDetailsProps,
  PersonalDetailsProps,
  StudentDetailsProps,
} from "../../interface/ApplicantMode.Type";

const addressTemplate: AddressBaseProps = {
  houseNo: "",
  street: "",
  barangay: "",
  municipality: "",
  province: "",
  country: "",
  zip: "",
};

// Define reusable guardian object
const guardianTemplate: NameBaseProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  contact: "",
};

const studentDetails: StudentDetailsProps = {
  LRN: "",
  PSA: "",
  yearLevel: "",
  track: "",
  schoolYear: "",
  lastSchoolAttended: "",
};

const gradeDetails: GradeDetails = {
  english: "",
  filipino: "",
  math: "",
  science: "",
  generalAve: "",
};

const personalDetails: PersonalDetailsProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  gender: "",
  birthDate: "",
  age: 22,
  motherTounge: "",
  email: "",
  contact: "",
  facebookLink: "",
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
  is4psBeneficiary: "",
  isIndigenousPerson: "",
  isLWD: "",
};

const applicantInitialValue: ApplicantModelProps = {
  studentDetails,
  gradeDetails,
  personalDetails,
  addressDetails,
  guardianDetails,
  otherDetails,
};

export default applicantInitialValue;
