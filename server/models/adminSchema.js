import mongoose from "mongoose";

export const adminSchema = mongoose.Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    contact: { type: String, unique: true, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("admin", adminSchema);
