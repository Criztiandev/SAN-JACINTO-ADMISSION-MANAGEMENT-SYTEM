import mongoose from "mongoose";

const schema = {
  title: { type: String, require: true },
  label: { type: String, require: true },
  type: { type: String, enum: ["schedule", "examination", "event"] },
  date: { type: Date, require: true },
  time: {
    start: { type: String, require: true },
    end: { type: String, require: true },
  },
  venue: { type: String, require: true },
  coordinator: { type: String, require: true },
};

const examinationScheduleSchema = new mongoose.Schema(
  {
    ...schema,
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        default: [],
        maxLength: 255,
        unique: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "ongoing", "cancel"],
      default: "ongoing",
    },
    createdBy: {
      type: String,
      default: "N/A",
      require: true,
    },
  },
  { timestamps: true }
);

export const examinationSchedModel = mongoose.model(
  "Schedule",
  examinationScheduleSchema
);

// const scheduleSchema = new mongoose.Schema({}, { timestamps: true });

// const eventScheduleSchema = new mongoose.Schema({}, { timestamps: true });

// // export default mongoose.model("Schedule", scheduleSchema);
