import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import sessionModel from "../models/session.Model.js";
import { generateToken } from "../utils/token.utils.js";
import { storeTokenToCookies } from "../utils/cookie.utils.js";

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email });
  if (!user) throw new Error("Admin doest exist, Please Try again");

  if (!(await user.matchPassword(password))) {
    throw new Error("Incorrect Password, Please Try again");
  }

  // check session
  const currentSession = await sessionModel
    .findOne({ UID: user._id })
    .lean()
    .select("_id");

  if (currentSession) {
    throw new Error("Account Already Login, Please Try again");
  }

  // create session
  const createSession = await sessionModel.create({
    UID: user._id,
    agent: req.get("User-Agent"),
    expiration: Date.now() + 24 * 60 * 60 * 1000,
    status: true,
  });

  if (!createSession) {
    throw new Error("Something went wrong");
  }

  const token = generateToken(createSession._id, process.env.JWT_SECRET);
  storeTokenToCookies(res, process.env.AUTH_NAME, token);

  res.status(200).json({
    _id: user._id,
    message: "Access Granted",
  });
});
