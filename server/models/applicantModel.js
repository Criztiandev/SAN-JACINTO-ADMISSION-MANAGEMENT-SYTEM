import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  firstName: { type: String, default: "N/A" },
  middleName: { type: String, default: "N/A" },
  lastName: { type: String, default: "N/A" },
  contact: { type: String, default: "N/A" },
});

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, default: "N/A" },
  street: { type: String, default: "N/A" },
  barangay: { type: String, required: true },
  municipality: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
});

const applicantSchema = mongoose.Schema(
  {
    studentDetails: {
      LRN: { type: String, default: "N/A" },
      PSA: { type: String, default: "N/A" },
      yearLevel: { type: String, required: true },
      track: { type: String, require: true },
      schoolYear: { type: String, require: true },
      lastSchoolAttended: { type: String, require: true },
    },

    personalDetails: {
      firstName: { type: String, required: true },
      middleName: { type: String, default: "" },
      lastName: { type: String, required: true },
      suffix: { type: String, default: "" },
      gender: { type: String, required: true },
      birthDate: { type: String },
      age: { type: Number, required: true },
      motherTongue: { type: String, required: true }, // Corrected typo
      email: { type: String, require: true, unique: true },
      contact: { type: String, require: true, unique: true },
      religion: { type: String, require: true },
    },

    gradeDetails: {
      english: { type: String, require: true },
      filipino: { type: String, require: true },
      math: { type: String, require: true },
      science: { type: String, require: true },
      generalAve: { type: String, require: true },
    },

    addressDetails: {
      permanent: addressSchema,
      current: addressSchema,
    },

    guardianDetails: {
      father: nameSchema,
      mother: nameSchema,
      legalGuardian: {
        firstName: { type: String, required: true },
        middleName: { type: String, default: "N/A" },
        lastName: { type: String, required: true },
        contact: { type: String, default: "N/A" },
      },
    },

    otherDetails: {
      is4psBeneficiary: { type: String, default: "N/A" },
      isIndigenousPerson: { type: String, default: "N/A" },
      isLWD: { type: String, default: "N/A" },
    },

    role: {
      type: String,
      enum: ["applicant", "examiniees", "regular", "transferee"],
      default: "applicant",
    },
    status: {
      type: String,
      enum: ["pending", "archive", "accepted", "scheduled", "waiting", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Custom Function

export default mongoose.model("applicants", applicantSchema);
