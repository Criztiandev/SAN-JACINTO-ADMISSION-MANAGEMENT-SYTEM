/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export const addressTemplateSchema = Yup.object().shape({
  houseNo: Yup.string()
    .required("House number is required")
    .matches(/^[1-9A-Za-z\s]+$/, "Invalid house number")
    .max(50, "Too long"),

  street: Yup.string()
    .required("Street is required")
    .matches(/^[a-zA-Z0-9 -]+$/, "Should only contain Number, Space and Hypen")
    .matches(/^[A-Z0-9 -]+$/, "It should be in uppercase / Big letter")
    .min(3, "Too short")
    .max(20, "Too Long")
    .trim("Trimmed"),

  barangay: Yup.string()
    .required("Barangay is required")
    .matches(/^[a-zA-Z0-9 -]+$/, "Should only contain Number, Space and Hypen")
    .matches(/^[A-Z0-9 -]+$/, "It should be in uppercase / Big letter")
    .min(3, "Too short")
    .max(20, "Too Long")
    .trim("Trimmed"),
  municipality: Yup.string()
    .required("Municipality is required")
    .matches(/^[a-zA-Z0-9 -]+$/, "Should only contain Number, Space and Hypen")
    .matches(/^[A-Z0-9 -]+$/, "It should be in uppercase / Big letter")
    .min(5, "Too Short")
    .max(50, "Too long"),
  province: Yup.string()
    .required("Province is required")
    .matches(/^[a-zA-Z0-9 -]+$/, "Should only contain Number, Space and Hypen")
    .matches(/^[A-Z0-9 -]+$/, "It should be in uppercase / Big letter")
    .min(5, "Too Short")
    .max(50, "Too long"),
  country: Yup.string()
    .required("Country is required")
    .matches(/^[a-zA-Z0-9 -]+$/, "Should only contain Number, Space and Hypen")
    .matches(/^[A-Z0-9 -]+$/, "It should be in uppercase / Big letter")
    .min(5, "Too Short")
    .max(50, "Too long"),
  zip: Yup.string()
    .required("ZIP code is required")
    .min(3, "Too short")
    .max(7, "Too long"),
});

const guardianTemplateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
    .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
    .min(3, "Too short")
    .max(20, "Too Long")
    .trim("Trimmed"),

  middleName: Yup.string()
    .required("Middle name is required")
    .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
    .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
    .min(3, "Too short")
    .max(20, "Too Long")
    .trim("Trimmed"),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
    .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
    .min(3, "Too short")
    .max(20, "Too Long")
    .trim("Trimmed"),

  contact: Yup.string()
    .required("Contact is required")
    .matches(
      /^(09\d*|N\/A)$/,
      "Invalid contact. Should start with 09 or be N/A"
    )
    .matches(/^(09\d*|N\/A|\d+)$/, "Invalid contact. Only numbers are allowed")
    .max(12, "Contact must not exceed 12 characters"),
});

export const studentDetailsSchema = Yup.object().shape({
  studentDetails: Yup.object().shape({
    LRN: Yup.string()
      .required("LRN is required")
      .max(12, "Too Long")
      .min(3, "Too Short"),
    PSA: Yup.string()
      .required("PSA is required")
      .max(12, "Too Long")
      .min(3, "Too Short"),
    track: Yup.string().required("Track is required"),
    schoolYear: Yup.string()
      .required("School year is required")
      .test(
        "is-at-least-10-years",
        "School year should be at least 10 years from the current year",
        function (value) {
          // Check if the value is a valid year and is at least 5 years from the current year
          const currentYear = new Date().getFullYear();
          const selectedYear = parseInt(value, 10);
          return !isNaN(selectedYear) && selectedYear >= currentYear - 10;
        }
      ),
    lastSchoolAttended: Yup.string()
      .required("Last School Name is required")
      .matches(/^[a-zA-Z ]+$/, "Last School Name  should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(3, "Too short")
      .max(32, "Too Long")
      .trim("Trimmed"),
  }),
});

export const studentYearLevelSchema = Yup.object().shape({
  studentDetails: Yup.object().shape({
    yearLevel: Yup.string()
      .required("Required Field")
      .oneOf(
        ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
        "Please select a year level"
      ),
  }),
});

const gradeDetailsSchema = Yup.object().shape({
  gradeDetails: Yup.object().shape({
    english: Yup.number()
      .required("English grade is required")
      .min(60, "English grade must be at least 60")
      .max(100, "English grade must be at most 100"),

    filipino: Yup.number()
      .required("Filipino grade is required")
      .min(60, "Filipino grade must be at least 60")
      .max(100, "Filipino grade must be at most 100"),

    math: Yup.number()
      .required("Math grade is required")
      .min(60, "Math grade must be at least 60")
      .max(100, "Math grade must be at most 100"),

    science: Yup.number()
      .required("Science grade is required")
      .min(60, "Science grade must be at least 60")
      .max(100, "Science grade must be at most 100"),

    generalAve: Yup.number()
      .required("General average is required")
      .min(60, "General average must be at least 60")
      .max(100, "General average must be at most 100"),
  }),
});

const personalDetailsSchema = Yup.object().shape({
  personalDetails: Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(3, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),

    middleName: Yup.string()
      .required("Middle name is required")
      .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(3, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z ]+$/, "First name should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(3, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),

    suffix: Yup.string().notRequired(),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(
        ["male", "female", "Male", "Female"],
        "Gender must be Male or Female only"
      ),
    birthDate: Yup.string(),
    age: Yup.number().required("Age is required"),
    religion: Yup.string().required("Religion is Required"),
    motherTongue: Yup.string().required("Mother tongue is required"),
    email: Yup.string().email("Invalid email address"),
    contact: Yup.string()
      .required("Contact is required")
      .min(3, "Too Short")
      .max(13, "Too long"),
    facebookLink: Yup.string().url("Invalid URL format"),
  }),
});

const addressDetailsSchema = Yup.object().shape({
  addressDetails: Yup.object().shape({
    permanent: addressTemplateSchema,
    current: addressTemplateSchema,
  }),
});

const guardianDetailsSchema = Yup.object().shape({
  guardianDetails: Yup.object().shape({
    father: guardianTemplateSchema,
    mother: guardianTemplateSchema,
    legalGuardian: guardianTemplateSchema,
  }),
});

const otherDetailsSchema = Yup.object().shape({
  otherDetails: Yup.object().shape({
    is4psBeneficiary: Yup.string()
      .required("is4psBeneficiary is required")
      .matches(/^[a-zA-Z ]+$/, "is4psBeneficiary should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(2, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),

    isIndigenousPerson: Yup.string()
      .required("This Field is requried")
      .matches(/^[a-zA-Z ]+$/, "isIndigenousPerson should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(2, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),

    isLWD: Yup.string()
      .required("This Field is requried")
      .matches(/^[a-zA-Z ]+$/, "isIndigenousPerson should only contain letters")
      .matches(/^[A-Z ]+$/, "It should be in uppercase / Big letter")
      .min(2, "Too short")
      .max(20, "Too Long")
      .trim("Trimmed"),
  }),
});

export const preferedValidationSchema = (level: string) => {
  const validations: Record<string, any> = {
    "0": studentYearLevelSchema,
    "1": gradeDetailsSchema,
    "2": studentDetailsSchema,
    "3": personalDetailsSchema,
    "4": addressDetailsSchema,
    "5": guardianDetailsSchema,
    "6": otherDetailsSchema,
    // Add more validations for other levels if needed
  };

  return validations[level] || studentYearLevelSchema;
};
