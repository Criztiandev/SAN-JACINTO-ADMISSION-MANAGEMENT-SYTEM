/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps } from "./FormInterface";

export interface AddressBaseProps {
  houseNo: string;
  street: string;
  barangay: string;
  municipality: string;
  province: string;
  country: string;
  zip: string;
}

export interface NameBaseProps {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix?: string;
  contact: string;
}

export interface StudentDetailsProps {
  LRN: string;
  PSA: string;
  yearLevel: string;
  track: string;
  schoolYear: string;
  lastSchoolAttended: string;
}

export interface GradeDetails {
  english: string;
  filipino: string;
  math: string;
  science: string;
  generalAve: string;
}

export interface PersonalDetailsProps extends NameBaseProps {
  gender: string;
  birthDate: Date | string;
  age: number;

  motherTongue: string;
  email: string;
  facebookLink: string;
  religion: string;
}

export interface AddressDetailsProps {
  permanent: AddressBaseProps;
  current: AddressBaseProps;
}

export interface SchoolDetailsProps {
  ID: string;
  name: string;
  contact: string;
}

export interface GuardianDetailsProps {
  father: NameBaseProps;
  mother: NameBaseProps;
  legalGuardian: NameBaseProps;
}

export interface OtherDetailsProps {
  is4psBeneficiary: string;
  isIndigenousPerson: string;
  isLWD: string;
}

export interface ApplicantModelProps {
  studentDetails: StudentDetailsProps;
  gradeDetails: GradeDetails;
  personalDetails: PersonalDetailsProps;
  addressDetails: AddressDetailsProps;
  guardianDetails: GuardianDetailsProps;
  otherDetails: OtherDetailsProps;
}

export interface ApplicationFormModelProps {
  title: string;
  model: InputProps[];
}
