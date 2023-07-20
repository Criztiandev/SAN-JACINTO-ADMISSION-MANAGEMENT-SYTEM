import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
});
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email }).select("_id");
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await adminModel.create(...req.body);
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
export const forgotPassword = asyncHandler(async (req, res) => {});
export const checkPoint = asyncHandler(async (req, res) => {});
