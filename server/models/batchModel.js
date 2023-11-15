import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
  title: { type: String, required: true },
  schedule: { type: mongoose.Types.ObjectId, default: null, require: true },
  examiniees: [{ type: mongoose.Types.ObjectId, required: true }],
  status: {
    type: String,
    enum: ["ongoing", "cancel", "finished"],
    default: "ongoing",
  },
});

export default mongoose.model("batches", batchSchema);
