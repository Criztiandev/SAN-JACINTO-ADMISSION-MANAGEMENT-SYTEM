import * as Yup from "yup";
import {
  Address,
  ApplicantModelInterface,
  Guardian,
  PersonalDetails,
  StudentDetails,
} from "../interface/applicantModelInterface";

export const YearLevelEnum: Array<string> = ["7", "8", "9", "10", "11", "12"];

const baseValidation = (min: number, max: number, required: boolean) =>
  Yup.string()
    .min(min, `Must be at least ${min} characters long`)
    .max(max, `Must not exceed ${max} characters`)
    .required(required ? "Field is required" : undefined);

const addressSchema: Yup.Schema<Address> = Yup.object().shape({
  houseNo: baseValidation(3, 50, true),
  street: baseValidation(3, 100, true),
  barangay: baseValidation(3, 50, true),
  municipality: baseValidation(3, 100, true),
  province: baseValidation(3, 100, true),
  country: baseValidation(3, 100, true),
  zip: baseValidation(3, 10, true),
});

const guardianSchema: Yup.Schema<Guardian> = Yup.object().shape({
  firstName: baseValidation(3, 100, true),
  middleName: baseValidation(3, 100, true),
  lastName: baseValidation(3, 100, true),
  contact: baseValidation(3, 12, true),
});

const studentDetailsSchema: Yup.Schema<StudentDetails> = Yup.object().shape({
  LRN: baseValidation(3, 12, true),
  PSA: baseValidation(3, 100, true),
  yearLevel: Yup.string()
    .oneOf(YearLevelEnum)
    .required("Year level is required"),
  track: Yup.string()
    .oneOf(["regular", "spe", "spj", "gas", "stem", "tvl"])
    .required("Track is required"),
  schoolYear: baseValidation(3, 100, true),
});

const personalDetailsSchema: Yup.Schema<PersonalDetails> = Yup.object().shape({
  firstName: baseValidation(3, 100, true),
  middleName: baseValidation(3, 100, true),
  lastName: baseValidation(3, 100, true),
  suffix: Yup.string().max(3, "Suffix is too long").required(),

  gender: Yup.string()
    .oneOf(["male", "female"], "Invalid Gender")
    .required("Gender is required"),
  birthDate: Yup.date()
    .max(new Date(), "Birthdate cannot be in the future")
    .min(new Date("1900-01-01"), "Birthdate cannot be earlier than 1900")
    .required("Birthdate is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(0, "Age must be at least 0 years old")
    .max(120, "Age cannot exceed 120 years")
    .required("Age is required"),

  gmail: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  contact: baseValidation(3, 12, true),
  motherTounge: baseValidation(3, 100, true),
});

const accountDetailsSchema = Yup.object().shape({
  facebook: baseValidation(3, 15, true),
  OTP: baseValidation(3, 6, true),
});

const applicantSchema: Yup.Schema<ApplicantModelInterface> = Yup.object().shape(
  {
    studentDetails: studentDetailsSchema,
    personalDetails: personalDetailsSchema,
    accountDetails: accountDetailsSchema,
    addressDetails: Yup.object().shape({
      permanent: addressSchema,
      current: addressSchema,
    }),
    schoolDetails: Yup.object().shape({
      ID: baseValidation(3, 100, true),
      name: baseValidation(3, 100, true),
      contact: baseValidation(3, 12, true),
    }),
    guardianDetails: Yup.object().shape({
      father: guardianSchema,
      mother: guardianSchema,
      legalGuardian: guardianSchema,
    }),
    otherDetails: Yup.object().shape({
      is4psBeneficiary: baseValidation(1, 100, true),
      isIndigenousPerson: baseValidation(1, 100, true),
      isLWD: baseValidation(1, 100, true),
    }),
  }
);

export default applicantSchema;
