import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  title: { type: String, require: true },
  platform: {
    type: String,
    enum: ["facebook", "gmail"],
    default: "facebook",
    require: true,
  },
  audience: { type: String, require: true },
  schedule: {
    date: { type: Date, require: true },
    time: { type: String, require: true },
  },
  createdBy: { type: String, require: true },
  updatedBy: { type: String, require: true },
});
