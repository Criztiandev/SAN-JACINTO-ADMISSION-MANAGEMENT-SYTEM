import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

// Middleware to hash password before saving
adminSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) {
    next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("admin", adminSchema);
