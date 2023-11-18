import mongoose from "mongoose";

const examResultsSchema = new mongoose.Schema({
  APID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "applicant",
    required: true,
    unique: true,
  },
  fullName: { type: String, require: true },
  email: { type: String, require: true },
  contact: { type: String, require: true },
  fbID: { type: String },
  schedule: { type: Date, default: null },
  score: { type: Number, default: 0 },
  track: { type: String, require: true },
  status: {
    type: String,
    enum: ["pending", "passed", "failed"],
    default: "pending",
  },
  regitrationDate: { type: Date, default: Date.now() },
  permitID: { type: String, require: true },
});

export default mongoose.model("examiniees", examResultsSchema);
