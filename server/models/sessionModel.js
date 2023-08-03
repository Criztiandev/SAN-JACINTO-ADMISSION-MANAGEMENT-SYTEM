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
    expiresAt: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true }
);

export default mongoose.model("session", sessionSchema);
