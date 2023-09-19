const addressTemplate = {
  houseNo: "",
  street: "",
  barangay: "",
  municipality: "",
  province: "",
  country: "",
  zip: "",
};

// Define reusable guardian object
const guardianTemplate = {
  firstName: "",
  middleName: "",
  lastName: "",
  contact: "",
};

const applicantTemplate = {
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
    permanentAddress: { ...addressTemplate },
    currentAddress: { ...addressTemplate },
  },

  schoolDetails: {
    ID: "",
    name: "",
    contact: "",
  },

  // Use the guardianObject for father, mother, and legal guardian
  guardianDetails: {
    father: { ...guardianTemplate },
    mother: { ...guardianTemplate },
    legalGuardian: { ...guardianTemplate },
  },

  otherDetails: {
    is4psBeneficiary: "",
    isIndigenousPerson: "",
    isLWD: "",
  },
};

export default applicantTemplate;
