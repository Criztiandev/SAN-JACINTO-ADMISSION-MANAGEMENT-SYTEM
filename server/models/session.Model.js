import mongoose from "mongoose";
import adminModel from "./adminModel.js";

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
    // expiresAt: { type: Date, default: Date.now }, //expires: 50000 },
  },
  { timestamps: true }
);

sessionSchema.statics.findSession = async function (
  filter,
  { getUser = false } = {}
) {
  const keys = Object.keys(filter);
  const query = keys.map(field => ({ [field]: filter[field] }));

  try {
    const session = await this.findOne({ $or: query });
    if (getUser) {
      const user = await adminModel.findUser(
        { _id: session.UID },
        { exist: true, select: "fullname email contact _id" }
      );
      return {
        ...session._doc,
        UID: user,
      };
    }

    return session;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default mongoose.model("session", sessionSchema);
