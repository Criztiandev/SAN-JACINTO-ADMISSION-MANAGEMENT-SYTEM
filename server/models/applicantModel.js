import mongoose from "mongoose";
import bcrypt from "bcrypt";

const parentSchema = new mongoose.Schema({
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
      yearLevel: {
        type: String,
        enum: [
          "grade 7",
          "grade 8",
          "grade 9",
          "grade 10",
          "grade 11",
          "grade 12",
        ],
        required: true,
      },
      track: { type: String, require: true },
    },

    personalDetails: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
      suffix: { type: String, required: true },
      gender: { type: String, enum: ["male", "female"], required: true },
      birthDate: { type: Date, required: true },
      age: { type: Number, required: true },
    },

    socials: {
      facebook: {
        id: { type: String, require: true, unique: true },
        link: { type: String, require: true },
      },
      gmail: { type: String, require: true, unique: true },
      contact: { type: String, require: true, unique: true },

      preferedContact: {
        type: String,
        enum: ["facebook", "gmail"],
        required: true,
      },
    },

    addressDetails: {
      permanentAddress: addressSchema,
      currentAddress: addressSchema,
    },

    schoolDetails: {
      schoolID: { type: Number, require: true },
      schoolName: { type: String, require: true },
      schoolYear: { type: String, require: true },
      contact: { type: String, require: true },
    },

    guardianDetails: {
      father: parentSchema,
      mother: parentSchema,
      legalGuardian: parentSchema,
    },

    otherDetails: {
      is4psBeneficiary: { type: String, require: true },
      isIndigenousPerson: { type: String, require: true },
      isLWD: { type: String, require: true },
    },

    files: {
      sp9: { type: String, require: true },
      goodMoral: { type: String, require: true },
      NSO: { type: String, require: true },
    },

    signature: { type: String, require: true },
    status: {
      type: String,
      enum: ["pending", "revision", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Custom Function

export default mongoose.model("applicants", applicantSchema);
