import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    UID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    agent: [{ type: String, required: true }],
    status: { type: Boolean, default: false },
    expiration: {
      type: Date,
      expires: "1m",
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("session", sessionSchema);
