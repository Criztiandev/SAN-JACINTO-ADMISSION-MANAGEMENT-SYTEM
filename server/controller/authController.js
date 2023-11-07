import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import sessionModel from "../models/session.Model.js";
import { generateToken } from "../utils/token.utils.js";
import { storeTokenToCookies } from "../utils/cookie.utils.js";
import jwt from "jsonwebtoken";

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email });
  if (!user) throw new Error("Admin doest exist, Please Try again");

  if (!(await user.matchPassword(password))) {
    throw new Error("Incorrect Password, Please Try again");
  }

  const secret = process.env.JWT_SECRET + user.password;
  const token = jwt.sign({ _id: user._id, email: user.email }, secret, {
    expiresIn: "15m",
  });
  const checkPointURL = `${process.env.BASE_URL}/checkpoint/${user._id}/${token}`;

  res.status(200).json({
    _id: user._id,
    message: "Access Granted",
  });
});
