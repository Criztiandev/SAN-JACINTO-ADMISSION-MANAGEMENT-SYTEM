// Define reusable address object
const addressObject = {
  houseNo: "",
  street: "",
  barangay: "",
  municipality: "",
  province: "",
  country: "",
  zip: "",
};

// Define reusable guardian object
const guardianObject = {
  firstName: "",
  middleName: "",
  lastName: "",
  contact: "",
};

export const applicantInitialValue = {
  studentDetails: {
    LRN: "",
    PSA: "",
    yearLevel: "",
    track: "",
  },

  personalDetails: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    gender: "",
    birthDate: "",
    age: "",
  },

  socials: {
    facebook: "",
    gmail: "",
    contact: "",
  },

  // Use the addressObject for both permanent and current addresses
  addressDetails: {
    permanentAddress: { ...addressObject },
    currentAddress: { ...addressObject },
  },

  schoolDetails: {
    ID: "",
    name: "",
    contact: "",
  },

  // Use the guardianObject for father, mother, and legal guardian
  guardianDetails: {
    father: { ...guardianObject },
    mother: { ...guardianObject },
    legalGuardian: { ...guardianObject },
  },

  otherDetails: {
    is4psBeneficiary: "",
    isIndigenousPerson: "",
    isLWD: "",
  },
};
