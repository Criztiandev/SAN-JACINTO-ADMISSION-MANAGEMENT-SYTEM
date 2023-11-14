import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
  title: { type: String, required: true },
  schedule: { type: mongoose.Types.ObjectId, default: null, require: true },
  examinees: [{ EID: { type: mongoose.Types.ObjectId, required: true } }],
});

export default mongoose.model("batches", batchSchema);
