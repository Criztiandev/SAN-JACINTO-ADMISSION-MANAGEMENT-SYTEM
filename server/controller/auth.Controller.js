import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel
    .findOne({
      $or: [{ email: email }, { contact: email }],
    })
    .select("_id");

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or contact, please try again");
  }

  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid password, please try again");
  }

  // Generate token

  res.status(200).json({
    message: "User logged in successfully",
  });
});

export const registerUser = asyncHandler(async (req, res) => {
  const { email, contact } = req.body;

  const emailExist = await adminModel.findOne({ email }).select("_id").lean();
  if (emailExist) {
    res.status(400);
    throw new Error("Email already exists, please Try again");
  }

  const contactExist = await adminModel
    .findOne({ contact })
    .lean()
    .select("_id");
  if (contactExist) {
    res.status(400);
    throw new Error("Contact Already exist, please try again");
  }

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
export const forgotPassword = asyncHandler(async (req, res) => {});
export const checkPoint = asyncHandler(async (req, res) => {});
