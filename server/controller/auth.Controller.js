import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import {
  generateMagicSecret,
  generateMagicToken,
  verifyMagicToken,
} from "../utils/token.utils.js";
import { sendEmail } from "../utils/email.uitls.js";
import bcypt from "bcrypt";

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
  const user = await adminModel
    .findOne({ emai: email })
    .lean()
    .select("_id email password");
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // create a one time password link that is valid for 15 minutes
  const secret = generateMagicSecret(user.password);
  const payload = { _id: user._id };

  const token = generateMagicToken(payload, secret);

  const salt = await bcypt.genSalt(10);
  const hashedID = await bcypt.hash(user._id.toString(), salt);

  const link = `http://localhost:4000/api/auth/reset-password/${hashedID}/${token}`;

  // const content = {
  //   target: email,
  //   title: "Forgot Password Verfication",
  //   body: link,
  // };

  // const mail = await sendEmail(res, content);
  // if (!mail) {
  //   res.status(400);
  //   throw new Error("Email not sent, please try again");
  // }

  res.status(200).json({
    link: link,
    message: "Email sent successfully",
  });
});

export const getResetToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  console.log(req.params);

  try {
    // verify if user exist
  } catch (error) {
    res.status(400);
    throw new Error("Invalud Token");
  }
});

export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  // check if the user exist
  const user = await adminModel.findById(id).lean().select("_id password");

  if (!user) {
    res.status(400);
    throw new Error("Invalid User");
  }

  // check if the token tampered
  if (id !== user._id.toString()) {
    res.status(400);
    throw new Error("Invalid Token, please try again");
  }

  // generate a new token and compare it with the old one
  const secret = generateMagicSecret(user.password);

  try {
    const decoded = verifyMagicToken(token, secret);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Token");
  }
});

export const checkPoint = asyncHandler(async (req, res) => {});
