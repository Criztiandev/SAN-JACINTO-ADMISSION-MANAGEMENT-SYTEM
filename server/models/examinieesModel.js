import mongoose from "mongoose";

const examineeSchema = new mongoose.Schema({
  APID: { type: mongoose.Types.ObjectId, require: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  suffix: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String },
  facebookLink: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

const examResultsSchema = new mongoose.Schema({
  examinee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Examinee",
    required: true,
  },
  examDate: { type: Date, required: true },
  score: { type: Number, required: true },
  status: { type: String, required: true },
});

export const examinationResultModel = mongoose.model(
  "ExamResults",
  examResultsSchema
);

export default mongoose.model("examiniees", examineeSchema);
