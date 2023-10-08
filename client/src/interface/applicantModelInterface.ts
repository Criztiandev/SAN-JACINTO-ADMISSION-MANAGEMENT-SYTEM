export interface Address {
  houseNo: string;
  street: string;
  barangay: string;
  municipality: string;
  province: string;
  country: string;
  zip: string;
}

export interface Guardian {
  firstName: string;
  middleName: string;
  lastName: string;
  contact: string;
}

export interface StudentDetails {
  LRN: string;
  PSA: string;
  yearLevel: string;
  track: string;
  schoolYear: string;
  lastSchoolAttended: string;
}

export interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  gender: string;
  birthDate: Date | null | undefined | string;
  age: number;

  motherTounge: string;
  email: string;
  contact: string;
}

export interface Account {
  facebook: string;
}

export interface AddressDetails {
  permanent: Address;
  current: Address;
}

export interface SchoolDetails {
  ID: string;
  name: string;
  contact: string;
}

export interface GuardianDetails {
  father: Guardian;
  mother: Guardian;
  legalGuardian: Guardian;
  choosen: string;
}

export interface OtherDetails {
  is4psBeneficiary: string;
  isIndigenousPerson: string;
  isLWD: string;
}

export interface ApplicantModelInterface {
  studentDetails: StudentDetails;
  personalDetails: PersonalDetails;
  accountDetails: Account;
  addressDetails: AddressDetails;
  schoolDetails: SchoolDetails;
  guardianDetails: GuardianDetails;
  otherDetails: OtherDetails;
}
