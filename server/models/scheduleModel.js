import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    venue: { type: String, require: true },
    time: { type: String, require: true },
    date: { type: String, require: true },

    applicants: { type: String },
    expiresAt: { type: Date, expires: 0 },
    createdBy: { type: mongoose.Types.ObjectId, require: true },
  },
  { timeStamps: true }
);

scheduleSchema.pre("save", function (next) {
  if (!this.isModified("time") || !this.isModified("date")) {
    next();
    return;
  }
});

export default mongoose.model("schedule", scheduleSchema);
