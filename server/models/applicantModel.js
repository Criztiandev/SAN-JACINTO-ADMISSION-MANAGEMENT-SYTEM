import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, require: true, unique: true },
});

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  street: { type: String, required: true },
  barangay: { type: String, required: true },
  municipality: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
});

const applicantSchema = mongoose.Schema(
  {
    studentDetails: {
      LRN: { type: String, required: true, unique: true },
      PSA: { type: String, required: true, unique: true },
      yearLevel: { type: String, required: true },
      track: { type: String, require: true },
      schoolYear: { type: String, require: true },
      lastSchoolAttended: { type: String, require: true },
    },

    personalDetails: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
      suffix: { type: String, default: "N/A" },
      gender: { type: String, required: true },
      birthDate: { type: String },
      age: { type: Number, required: true },
      motherTongue: { type: String, required: true }, // Corrected typo
      email: { type: String, require: true, unique: true },
      contact: { type: String, require: true, unique: true },
      facebookLink: { type: String, require: true, unique: true },
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
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        contact: { type: String, require: true, unique: true },
        relationship: { type: String, require: true },
      },
    },

    otherDetails: {
      is4psBeneficiary: { type: String, require: true },
      isIndigenousPerson: { type: String, require: true },
      isLWD: { type: String, require: true },
    },

    role: {
      type: String,
      enum: ["applicant", "examiniees", "regular"],
      default: "applicant",
    },
    status: {
      type: String,
      enum: ["pending", "archive", "accepted", "scheduled", "waiting"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Custom Function

export default mongoose.model("applicants", applicantSchema);
