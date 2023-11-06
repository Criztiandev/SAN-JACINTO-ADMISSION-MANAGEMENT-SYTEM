import * as Yup from "yup";

const addressTemplateSchema = Yup.object().shape({
  houseNo: Yup.string().required("House number is required"),
  street: Yup.string().required("Street is required"),
  barangay: Yup.string().required("Barangay is required"),
  municipality: Yup.string().required("Municipality is required"),
  province: Yup.string().required("Province is required"),
  country: Yup.string().required("Country is required"),
  zip: Yup.string().required("ZIP code is required"),
});

const guardianTemplateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("Middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string().required("Contact is required"),
});

const studentDetailsSchema = Yup.object().shape({
  LRN: Yup.string().required("LRN is required"),
  PSA: Yup.string().required("PSA is required"),
  yearLevel: Yup.string().required("Year level is required"),
  track: Yup.string().required("Track is required"),
  schoolYear: Yup.string().required("School year is required"),
  lastSchoolAttended: Yup.string().required("Last school attended is required"),
});

const gradeDetailsSchema = Yup.object().shape({
  english: Yup.string().required("English grade is required"),
  filipino: Yup.string().required("Filipino grade is required"),
  math: Yup.string().required("Math grade is required"),
  science: Yup.string().required("Science grade is required"),
  generalAve: Yup.string().required("General average is required"),
});

const personalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("Middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  suffix: Yup.string(),
  gender: Yup.string().required("Gender is required"),
  birthDate: Yup.string().required("Birth date is required"),
  age: Yup.number().required("Age is required"),
  motherTounge: Yup.string().required("Mother tongue is required"),
  email: Yup.string().email("Invalid email address"),
  contact: Yup.string().required("Contact is required"),
  facebookLink: Yup.string().url("Invalid URL format"),
});

const addressDetailsSchema = Yup.object().shape({
  permanent: addressTemplateSchema,
  current: addressTemplateSchema,
});

const guardianDetailsSchema = Yup.object().shape({
  father: guardianTemplateSchema,
  mother: guardianTemplateSchema,
  legalGuardian: guardianTemplateSchema,
});

const otherDetailsSchema = Yup.object().shape({
  is4psBeneficiary: Yup.string(),
  isIndigenousPerson: Yup.string(),
  isLWD: Yup.string(),
});

const applicantSchema = Yup.object().shape({
  addressDetails: addressDetailsSchema,
  guardianDetails: guardianDetailsSchema,
  studentDetails: studentDetailsSchema,
  gradeDetails: gradeDetailsSchema,
  personalDetails: personalDetailsSchema,
  otherDetails: otherDetailsSchema,
});

export default applicantSchema;
