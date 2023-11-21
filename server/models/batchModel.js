import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
  title: { type: String, required: true },
  schedule: { type: mongoose.Types.ObjectId, default: null, require: true },
  selected: [{ type: mongoose.Types.ObjectId, required: true }],
  status: {
    type: String,
    enum: ["pending", "ongoing", "cancel", "finished"],
    default: "pending",
  },
});

export default mongoose.model("batches", batchSchema);
