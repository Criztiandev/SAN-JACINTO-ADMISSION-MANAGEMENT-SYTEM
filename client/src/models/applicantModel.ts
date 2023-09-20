import {
  Account,
  Address,
  AddressDetails,
  Guardian,
  GuardianDetails,
  OtherDetails,
  PersonalDetails,
  SchoolDetails,
  StudentDetails,
} from "../interface/modelInterface";

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
};

const personalDetails: PersonalDetails = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  gender: "",
  birthDate: "",
  age: "",
  gmail: "",
  contact: "",
  montherTounge: "",
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
};

const otherDetails: OtherDetails = {
  is4psBeneficiary: "",
  isIndigenousPerson: "",
  isLWD: "",
};

const applicantTemplate = {
  studentDetails,
  schoolDetails,
  personalDetails,
  addressDetails,
  guardianDetails,
  otherDetails,
  accountDetails,
};

export default applicantTemplate;
