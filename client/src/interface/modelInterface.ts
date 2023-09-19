interface Address {
  houseNo: string;
  street: string;
  barangay: string;
  municipality: string;
  province: string;
  country: string;
  zip: string;
}

interface Guardian {
  firstName: string;
  middleName: string;
  lastName: string;
  contact: string;
}

interface StudentDetails {
  LRN: string;
  PSA: string;
  yearLevel: string;
  track: string;
}

interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  gender: string;
  birthDate: string;
  age: string;
}

interface Socials {
  facebook: string;
  gmail: string;
  contact: string;
}

export interface applicantModelInterface {
  studentDetails: StudentDetails;
  personalDetails: PersonalDetails;
  socials: Socials;
  addressDetails: {
    permanentAddress: Address;
    currentAddress: Address;
  };
  schoolDetails: {
    ID: string;
    name: string;
    contact: string;
  };
  guardianDetails: {
    father: Guardian;
    mother: Guardian;
    legalGuardian: Guardian;
  };
  otherDetails: {
    is4psBeneficiary: string;
    isIndigenousPerson: string;
    isLWD: string;
  };
}
