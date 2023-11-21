/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export const addressTemplateSchema = Yup.object().shape({
  houseNo: Yup.string()
    .required("House number is required")
    .matches(/^[1-9A-Za-z\s]+$/, "Invalid house number")
    .max(50, "Too long"),
  street: Yup.string()
    .required("Street is required")
    .matches(/^[1-9A-Za-z\s]+$/, "Invalid street"),
  barangay: Yup.string().required("Barangay is required").max(50, "Too long"),
  municipality: Yup.string()
    .required("Municipality is required")
    .matches(/^[A-Za-z\s]+$/, "Invalid municipality")
    .max(50, "Too long"),
  province: Yup.string()
    .required("Province is required")
    .matches(/^[A-Za-z\s]+$/, "Invalid province")
    .max(50, "Too long"),
  country: Yup.string()
    .required("Country is required")
    .matches(/^[1-9A-Za-z\s]+$/, "Invalid country")
    .max(50, "Too long"),
  zip: Yup.string()
    .required("ZIP code is required")
    .min(3, "Too short")
    .max(7, "Too long"),
});

const guardianTemplateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[^\d]+$/, "Invalid first name")
    .max(50, "First name must not exceed 50 characters"),

  middleName: Yup.string()
    .required("Middle name is required")
    .matches(/^[^\d]+$/, "Invalid middle name")
    .max(50, "Middle name must not exceed 50 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[^\d]+$/, "Invalid last name")
    .max(50, "Last name must not exceed 50 characters"),

  contact: Yup.string()
    .required("Contact is required")
    .matches(/^\d+$/, "Invalid contact. Only numbers are allowed")
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
        "is-at-least-5-years",
        "School year should be at least 5 years from the current year",
        function (value) {
          // Check if the value is a valid year and is at least 5 years from the current year
          const currentYear = new Date().getFullYear();
          const selectedYear = parseInt(value, 10);
          return !isNaN(selectedYear) && selectedYear >= currentYear - 5;
        }
      ),
    lastSchoolAttended: Yup.string()
      .required("Last school attended is required")
      .min(5, "Too Short")
      .max(255, "Too long"),
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
      .matches(/^[A-Za-z\s]+$/, "First name should only contain letters"),

    middleName: Yup.string()
      .required("Middle name is required")
      .matches(/^[A-Za-z\s]+$/, "Middle name should only contain letters"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters"),

    suffix: Yup.string().required("Suffix is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(
        ["male", "female", "Male", "Female"],
        "Gender must be Male or Female only"
      ),
    birthDate: Yup.string(),
    age: Yup.number().required("Age is required"),
    motherTongue: Yup.string()
      .required("Mother tongue is required")
      .oneOf(["Filipino"], "Must be on of [Filipino]"),
    religion: Yup.string().oneOf(
      [
        "Roman Catholic",
        "Islam",
        "Iglesia ni Cristo",
        "Saksi ni Jehove",
        "Baptist",
        "Sabadista",
        "Christian",
      ],
      "Please Select in the Following [Roman Catholic, Iglesia ni Criso, Baptist, Saksi ni Jehove, Islam, Christian]"
    ),
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
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer"),

    isIndigenousPerson: Yup.string()
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer")
      .required("isIndigenousPerson is required"),

    isLWD: Yup.string()
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer")
      .required("isLWD is requried"),
  }),
});

export const applicantSchema = Yup.object().shape({
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
    yearLevel: Yup.string()
      .required("Required Field")
      .oneOf(
        ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
        "Please select a year level"
      ),
    schoolYear: Yup.string()
      .required("School year is required")
      .test(
        "is-at-least-5-years",
        "School year should be at least 5 years from the current year",
        function (value) {
          // Check if the value is a valid year and is at least 5 years from the current year
          const currentYear = new Date().getFullYear();
          const selectedYear = parseInt(value, 10);
          return !isNaN(selectedYear) && selectedYear >= currentYear - 5;
        }
      ),
    lastSchoolAttended: Yup.string()
      .required("Last school attended is required")
      .min(5, "Too Short")
      .max(255, "Too long"),
  }),

  personalDetails: Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/, "First name should only contain letters"),

    middleName: Yup.string()
      .required("Middle name is required")
      .matches(/^[A-Za-z]+$/, "Middle name should only contain letters"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/, "Last name should only contain letters"),

    suffix: Yup.string().required("Suffix is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(
        ["male", "female", "Male", "Female"],
        "Gender must be Male or Female only"
      ),
    birthDate: Yup.string(),
    age: Yup.number().required("Age is required"),
    motherTongue: Yup.string()
      .required("Mother tongue is required")
      .oneOf(["Filipino"], "Must be on of [Filipino]"),
    religion: Yup.string().oneOf(
      [
        "Roman Catholic",
        "Islam",
        "Iglesia ni Cristo",
        "Saksi ni Jehove",
        "Baptist",
        "Sabadista",
        "Christian",
      ],
      "Please Select in the Following [Roman Catholic, Iglesia ni Criso, Baptist, Saksi ni Jehove, Islam, Christian]"
    ),
    email: Yup.string().email("Invalid email address"),
    contact: Yup.string()
      .required("Contact is required")
      .min(3, "Too Short")
      .max(13, "Too long"),
    facebookLink: Yup.string().url("Invalid URL format"),
  }),

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

  addressDetails: Yup.object().shape({
    permanent: addressTemplateSchema,
    current: addressTemplateSchema,
  }),

  guardianDetails: Yup.object().shape({
    father: guardianTemplateSchema,
    mother: guardianTemplateSchema,
    legalGuardian: guardianTemplateSchema,
  }),

  otherDetails: Yup.object().shape({
    is4psBeneficiary: Yup.string()
      .required("is4psBeneficiary is required")
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer"),

    isIndigenousPerson: Yup.string()
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer")
      .required("isIndigenousPerson is required"),

    isLWD: Yup.string()
      .matches(/^(Yes|N\/A|No|\b\S+\b)$/, "Invalid answer")
      .required("isLWD is requried"),
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
