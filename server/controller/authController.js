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

  const performMail = await sendEmail({
    target: _user.email,
    title: "[SJNHS] Please Verify You Account",
    body: `
    Hey ${_user.fullName} 👋

    We hope this message finds you well. A recent sign-in attempt raised a security flag as we couldn't recognize the device used. To ensure the security of your account, we kindly ask you to complete the verification process.

    To complete the sign-in, please follow this link: ${checkPointRoute}
    
    Please be aware that this link will expire in 15 minutes for security reasons. In case the link expires, you can request a new one by visiting our registration page.
    
    If you did not initiate this sign-in attempt or do not have an account with ${_user.fullName}, please disregard this email.
    
    We appreciate your trust in SJNHS. Should you have any questions or encounter issues during the verification process, please do not hesitate to contact our dedicated support team at [Your Support Email].
    
    Thank you for choosing San Jacinto National High School.

    Best regards,
    Administration
  `,
  });

  if (!performMail)
    throw new Error("Failed to send Verification, Please Try again Later");

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

    const _sessionExist = await sessionModel.findOne({ UID: UID });
    if (_sessionExist) throw new Error("Applicant already logged in");

    const session = await sessionModel.create({
      UID: _user._id,
      agent: req.get("User-Agent"),
      status: true,
    });

    if (!session) throw new Error("Something went wrong, Please Try again");

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

export const getSessionByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
});

export const deleteSessionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const _session = await sessionModel
    .findOneAndDelete({ UID: id })
    .lean()
    .select("_id");
  if (!_session) {
    throw new Error("Session not found or already deleted");
  }

  res.status(200).json({
    payload: null,
    message: "Deleted Successfully",
  });
});
