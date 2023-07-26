import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    UID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
      unique: true,
    },

    agent: [{ type: String, require: true }],
    status: { type: Boolean, default: false },
    expiratiom: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("session", sessionSchema);
