import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import sessionModel from "../models/session.Model.js";
import { generateToken } from "../utils/token.utils.js";
import { storeTokenToCookies } from "../utils/cookie.utils.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.uitls.js";

const handleUserLogin = async (email, password) => {
  const user = await adminModel.findOne({ email });
  if (!user) throw new Error("User does not exist. Please try again.");

  if (!(await user.matchPassword(password)))
    throw new Error("Incorrect Password, Please Try again");

  return user;
};

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const _user = await handleUserLogin(email, password);

  // token initial data
  const secret = process.env.JWT_SECRET + _user.password;
  const payload = { _id: _user._id, email: _user.email };

  // generate token
  const token = generateToken(payload, secret, "15m");

  const checkPointRoute = `${process.env.BASE_URL}/checkpoint?id=${_user._id}&ver=${token}`;

  sendEmail(_user.email, {
    subject: "Account Verification Link",
    text: `We hope this email finds you well.

  Thank you for registering with ${_user.fullName}. To complete your registration and activate your account, please click on the verification link below:
  
  Link: ${checkPointRoute}
  
  
  Please note that this link will expire in 15m hours for security reasons. If the link has expired, you can request a new one by visiting our registration page.
  
  If you did not sign up for an account with ${_user.fullName}, please disregard this email.
  
  Thank you for choosing [Your Company Name], and if you have any questions or encounter any issues during the verification process, please don't hesitate to contact our support team at [Your Support Email].
  
  Best regards,
  
  Criztian Jade Tuplano
  San Jacinto National Highschool
  09482004679
  `,
  });

  res.status(200).json({
    message: "Link has sent to you email",
  });
});

export const verifyUserController = asyncHandler(async (req, res) => {
  const { UID, token } = req.body;
  const _user = await adminModel.findById(UID).lean();

  if (!_user) throw new Error("User doesn't exist, Redirecting to Home page..");

  if (UID !== _user._id.toString())
    throw new Error("Invalid ID, Redirecting to Home page..");

  // generate secret
  const secret = process.env.JWT_SECRET + _user.password;

  console.log(UID);
  console.log(token);

  try {
    const payload = jwt.verify(token, secret);

    //create session
    // const session = sessionModel.create({});

    res.status(200).json({
      payload,
      message: "Access Granted,",
    });
  } catch (e) {
    res.status(401).json({
      error: e.message,
    });
  }
});
