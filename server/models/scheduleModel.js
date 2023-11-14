import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  facilitator: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
    unique: true,
  },
  batches: [
    {
      type: String,
      unique: true,
    },
  ],
  schedule: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  time: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  venue: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  details: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  status: { type: String, enum: ["ongoing", "finished"], default: "ongoing" },
});

export default mongoose.model("Schedule", scheduleSchema);
