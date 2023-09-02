import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, require: true },
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
      LRN: { type: String, required: true },
      PSA: { type: String, required: true },
      yearLevel: {
        type: String,
        enum: ["7", "8", "9", "10", "11", "12"],
        required: true,
      },
      track: { type: String, require: true },
    },

    personalDetails: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
      suffix: { type: String, required: true },
      gender: { type: String, enum: ["Male", "Female"], required: true },
      birthDate: { type: Date, required: true },
      age: { type: Number, required: true },
    },

    socials: {
      facebook: { type: String, require: true },
      gmail: { type: String, require: true },
      contact: { type: String, require: true },
      preferedContact: {
        type: String,
        enum: ["facebook", "gmail"],
        required: true,
      },
    },

    addressDetails: {
      permanentAddress: addressSchema,
      currentAddress: addressSchema,
      isCurrentAddress: { type: Boolean, require: true },
    },

    schoolDetails: {
      schoolID: { type: Number, require: true },
      schoolName: { type: String, require: true },
      schoolYear: { type: String, require: true },
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

    status: {
      type: String,
      enum: ["Pending", "Revision", "Accepted"],
      default: "Pending",
    },

    files: {
      sp9: { type: String, require: true },
      goodMoral: { type: String, require: true },
      NSO: { type: String, require: true },
    },

    signature: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("applicants", applicantSchema);
