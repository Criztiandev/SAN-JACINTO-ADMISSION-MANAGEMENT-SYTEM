import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  // Unique identifier for the schedule
  scheduleId: {
    type: String,
    unique: true,
    required: true,
  },

  // The name or title of the schedule (e.g., "Fall 2023 Semester Schedule")
  name: {
    type: String,
    required: true,
  },

  // Start and end dates for the schedule
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },

  // List of admission events or activities associated with the schedule
  events: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      description: String,
      // You can add more fields as needed
    },
  ],

  // Other schedule-related information
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who created the schedule
  },
  // You can add more fields as needed
});

export default mongoose.model("Schedule", scheduleSchema);
