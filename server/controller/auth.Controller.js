import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import { generateToken } from "../utils/token.utils.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({
    $or: [{ email: email }, { contact: email }],
  });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid password, please try again");
  }

  // Generate token
  generateToken(res, user._id);

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

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // check if the user exist
  const user = await adminModel.findOne({ emai: email }).lean().select("_id");
  if (!user) {
    res.status(400);
    throw new Error("User Doesnt Exist");
  }

  // create a one time password link that is valid for 15 minutes
});
export const resetPassword = asyncHandler(async (req, res, next) => {});

export const checkPoint = asyncHandler(async (req, res) => {});
