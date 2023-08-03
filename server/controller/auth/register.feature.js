import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";

// Admin
export const registerFeature = asyncHandler(async (req, res) => {
  const newUser = await adminModel.create({ ...req.body });
  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    _id: newUser._id,
    email: newUser.email,
    message: "User created successfully",
  });
});

export default registerFeature;
