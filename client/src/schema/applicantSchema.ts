/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const YearLevelEnum = ["7", "8", "9", "10", "11", "12"];

const addressSchema = yup.object().shape({
  houseNo: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Must not exceed 50 characters")
    .required("House No. is required"),
  street: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Street is required"),
  barangay: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Must not exceed 50 characters")
    .required("Barangay is required"),
  municipality: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Municipality is required"),
  province: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Province is required"),
  country: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must not exceed 100 characters")
    .required("Country is required"),
  zip: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(10, "Must not exceed 10 characters")
    .required("Zip Code is required"),
});

const applicantSchema: any = yup.object().shape({
  // Student details schema
  LRN: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(12, "LRN should 12 character long")
    .required("LRN is required"),

  PSARef: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(12, "Must not exceed 100 characters")
    .required("PSA Ref is required"),

  yearLevel: yup.string().oneOf(YearLevelEnum).required("Year level required"),
  track: yup
    .string()
    .oneOf(["regular", "spe", "spj", "gas", "stem", "tvl"])
    .required("Track is required"),

  schoolID: yup
    .string()
    .min(3, "Must be atleast 3 chracter long")
    .max(100, "Too long")
    .required("School ID is require"),
  schoolYear: yup.string().required("School Year is required"),

  // School Details
  schoolName: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(100, "Too long")
    .required("First name is required"),

  schoolContact: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(12, "Contact is too long")
    .required("Contact is required"),

  // Personal Details Schema
  firstName: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(100, "Too long")
    .required("First name is required"),

  middleName: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(100, "Too long")
    .required("Middle name is required"),

  lastName: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(100, "Too long")
    .required("Last name is required"),

  suffix: yup.string().max(3, "Suffix is too long"),

  // Other details schema
  gender: yup
    .string()
    .oneOf(["male", "female"], "Invalid Gender")
    .required("Gender is required"),
  birthdate: yup
    .date()
    .max(new Date(), "Sana all Baby nakaka computer na")
    .min(
      new Date("1900-01-01"),
      "Birthdate Cannot be like that unless your immortal"
    )
    .required("Birthdate is Required"),

  age: yup
    .number()
    .positive("Must be a positive number")
    .integer("Age must be a integer")
    .min(0, "Age must be at least 0 year old")
    .max(120, "Are you sure about that ? ")
    .required("Age is required"),

  // Socials Schema
  fbID: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(15, "Facebook ID should be 15 max charater")
    .required("Facebook ID is required"),

  gmail: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required"),

  contact: yup
    .string()
    .min(3, "Must be atleast 3 character long")
    .max(12, "Contact is too long")
    .required("Contact is required"),

  // Address Schema
  permanentAddress: addressSchema,
  currentAddres: addressSchema,

  // Guardian Schema
  fatherFirstName: yup
    .string()
    .min(3, "Must be a 3 charater long")
    .max(255, "Too long")
    .required("Father first name is required"),

  fatherMiddleName: yup
    .string()
    .min(3, "Must be a 3 charater long")
    .max(255, "Too long")
    .required("Father middle name is required"),

  fatherLastName: yup
    .string()
    .min(3, "Must be 3 character long")
    .max(255, "Too long")
    .required("Father's last name is required"),

  mothersFirstName: yup
    .string()
    .min(3, "Must be a 3 charater long")
    .max(255, "Too long")
    .required("Mother's First name is required"),

  mothersMiddleName: yup
    .string()
    .min(3, "Must be a 3 charater long")
    .max(255, "Too long")
    .required("Mother's middle name is required"),

  motherLastName: yup
    .string()
    .min(3, "Must be 3 character long")
    .max(255, "Too long")
    .required("Mother's last name is required"),

  // Other Details
  is4psBeneficiary: yup
    .boolean()
    .required("Please specify if the applicant is a 4PS beneficiary"),

  // Add a condition for "yes" value to require additional information
  additional4psInfo: yup
    .string()
    .test(
      "is4psBeneficiary",
      "Additional information is required for 4PS beneficiaries",
      function (value) {
        const _instance = this.parent.is4psBeneficiary;
        return _instance === true && (!value || value.trim() === "")
          ? false
          : true;
      }
    ),

  isIndigenousPerson: yup
    .boolean()
    .required("Please specify if your indigenous person"),

  isIndigenousPersonInfo: yup
    .string()
    .test(
      "iisIndigenousPersons",
      "Additional info is required to this filed",
      function (value) {
        const _instance = this.parent.isIndigenousPersonl;
        return _instance === true && (!value || value.trim() === "")
          ? false
          : true;
      }
    ),

  isLWD: yup
    .boolean()
    .required("Please specify if your a Learners with disability"),

  isLWDInfo: yup
    .string()
    .test("isLWD", "Addional info is required to this field", function (value) {
      const _instance = this.parent.isLWD;
      return _instance === true && (!value || value.trim() === "")
        ? false
        : true;
    }),
});

// // Custom Function

export default applicantSchema;
