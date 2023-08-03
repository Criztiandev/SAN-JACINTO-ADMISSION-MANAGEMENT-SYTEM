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

adminSchema.pre("updateOne", async function (next) {
  try {
    const data = this.getUpdate(); // get the update

    // check if there is password being modified
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Custome Functions
adminSchema.statics.findUser = async function (
  payload,
  { exist = false, select = "-password" } = {}
) {
  const checkers = Object.keys(payload);

  // Create a bulk query
  const query = checkers.map((field) => ({ [field]: payload[field] }));

  try {
    // single based query to get all the necessary data
    const user = await this.findOne({ $or: query }).select(
      select === "all" ? `+password` : select
    );

    if (user) {
      const field = checkers.find((e) => user[e] === payload[e]);

      if (exist) return user;
      else
        throw new Error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is already exist`
        );
    }

    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default mongoose.model("admin", adminSchema);
