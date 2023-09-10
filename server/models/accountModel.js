import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  APID: { type: mongoose.Schema.Types.ObjectId, require: true, unique: true },
  FBID: { type: String, require: true, unique: true },

  userDetails: {
    username: { type: String, require: true, unique: true },
    gmail: { type: String, require: true, unique: true },
    password: { type: String },
    permissions: {
      type: String,
      enum: ["_x2g3fffe", "_01x2032", "_x21x032"],
      require: true,
    },
  },

  personalDetails: {
    name: { type: String, require: true },
    age: { type: String, require: true },
    gender: { type: String, enum: ["male", "female"], require: true },
  },

  role: {
    type: String,
    enum: ["_x2g3fffe", "_01x2032", "_x21x032"],
    default: "_x21x032",
  },
  createdBy: { type: mongoose.Schema.ObjectId, require: true },
  updatedBy: { type: mongoose.Schema.ObjectId, default: null },
});

export default mongoose.model("account", accountSchema);
