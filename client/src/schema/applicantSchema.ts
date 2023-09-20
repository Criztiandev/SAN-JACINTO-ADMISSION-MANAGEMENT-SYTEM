/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

const YearLevelEnum = ["7", "8", "9", "10", "11", "12"];

const addressSchema = Yup.object().shape({
  houseNo: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Must not exceed 50 characters")
    .required("House No. is required"),
  street: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Street is required"),
  barangay: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Must not exceed 50 characters")
    .required("Barangay is required"),
  municipality: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Municipality is required"),
  province: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Province is required"),
  country: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Country is required"),
  zip: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(10, "Must not exceed 10 characters")
    .required("Zip Code is required"),
});

// Define a schema for the guardian object
const guardianSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Too long")
    .required("First name is required"),
  middleName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Too long")
    .required("Middle name is required"),
  lastName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Too long")
    .required("Last name is required"),
  contact: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(12, "Contact is too long")
    .required("Contact is required"),
});

// Define the main Yup schema for the entire form
const applicantSchema = Yup.object().shape({
  studentDetails: Yup.object().shape({
    LRN: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(12, "LRN should be 12 characters long")
      .required("LRN is required"),
    PSA: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Must not exceed 100 characters")
      .required("PSA Ref is required"),
    yearLevel: Yup.string()
      .oneOf(YearLevelEnum)
      .required("Year level is required"),
    track: Yup.string()
      .oneOf(["regular", "spe", "spj", "gas", "stem", "tvl"])
      .required("Track is required"),
    schoolYear: Yup.string().required("School Year is required"),
  }),

  personalDetails: Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("First name is required"),
    middleName: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Middle name is required"),
    lastName: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Last name is required"),
    suffix: Yup.string().max(3, "Suffix is too long"),

    gender: Yup.string()
      .oneOf(["male", "female"], "Invalid Gender")
      .required("Gender is required"),
    birthdate: Yup.date()
      .max(new Date(), "Birthdate cannot be in the future")
      .min(new Date("1900-01-01"), "Birthdate cannot be earlier than 1900")
      .required("Birthdate is required"),
    age: Yup.number()
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .min(0, "Age must be at least 0 years old")
      .max(120, "Age cannot exceed 120 years")
      .required("Age is required"),

    motherTounge: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Mother Tounge is required"),

    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    contact: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(12, "Contact is too long")
      .required("Contact is required"),
  }),

  facebook: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(15, "Account Link should be 15 characters max")
    .required("Account Link is required"),

  OTP: Yup.string()
    .min(3, "Must be atleast 3 character long")
    .max(6, "OTP is too long")
    .required("OTP is Requred"),

  // Use the addressSchema for both permanent and current addresses
  addressDetails: Yup.object().shape({
    permanentAddress: addressSchema.required("Permanent address is required"),
    currentAddress: addressSchema.required("Current address is required"),
  }),

  schoolDetails: Yup.object().shape({
    ID: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("School ID is required"),

    // School Details
    name: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("School name is required"),
    contact: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .max(12, "Contact is too long")
      .required("School contact is required"),
  }),

  // Use the guardianSchema for father, mother, and legal guardian
  guardianDetails: Yup.object().shape({
    father: guardianSchema.required(),
    mother: guardianSchema.required(),
    legalGuardian: guardianSchema.required(),
  }),

  otherDetails: Yup.object().shape({
    is4psBeneficiary: Yup.string()
      .min(1, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Reference number is required"),

    isIndigenousPerson: Yup.string()
      .min(1, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Field is required"),

    isLWD: Yup.string()
      .min(1, "Must be at least 3 characters long")
      .max(100, "Too long")
      .required("Field is required"),
  }),
});

export default applicantSchema;
