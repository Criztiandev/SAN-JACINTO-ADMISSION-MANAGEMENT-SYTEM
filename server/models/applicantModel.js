import mongoose from "mongoose";

const applicantSchema = mongoose.Schema(
  {
    personalInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: Number, required: true, unique: true },
      LRN: { type: Number, required: true, unique: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("applicants", applicantSchema);
