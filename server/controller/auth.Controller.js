import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import { generateToken, generateSecret } from "../utils/token.utils.js";
import { storeTokenToCookies } from "../utils/cookie.utils.js";
import sessionModel from "../models/sessionModel.js";
// import { sendEmail } from "../utils/email.uitls.js";
import { decryptData, encryptData } from "../utils/encryption.utils.js";

// combine the token based and session based authentication
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({
    $or: [{ email: email }, { contact: email }],
  });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  //* check if the password is correct
  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid password, please try again");
  }

  //* Check if the session exist
  const sessionExist = await sessionModel.findOne({ UID: user._id }).lean();

  if (sessionExist) {
    res.status(400);
    throw new Error("User already logged in");
  } else {
    //* Create a Session
    const agent = req.get("User-Agent");
    const session = await sessionModel.create({
      UID: user._id,
      agent: agent,
      expiration: Date.now() + 24 * 60 * 60 * 1000,
      status: true,
    });

    if (!session) {
      res.status(400);
      throw new Error("Session creation failed");
    }

    //* Geberate a token
    const token = generateToken(session._id, process.env.JWT_SECRET);

    // * Store to cookies
    storeTokenToCookies(res, "aut", token);

    res.status(200).json({
      id: user._id,
      email: user.email,

      message: "User logged in successfully",
    });
  }
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
    .findOne({ $or: [{ email: email }, { contact: email }] })
    .lean()
    .select("_id updatedAt");
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // create a one time password link that is valid for 15 minutes
  const secret = generateSecret({ token: null, secret: user.updatedAt });
  console.log(secret);
  const token = generateToken(user._id, secret, "15m");

  const encrytedToken = encryptData(token);
  const encryptedID = encryptData(user._id.toString());

  const link = `http://localhost:4000/api/auth/checkpoint/${encryptedID}/${encrytedToken}`;

  const content = {
    target: email,
    title: "Forgot Password Verfication",
    body: link,
  };

  const mail = await sendEmail(res, content);
  if (!mail) {
    res.status(400);
    throw new Error("Email not sent, please try again");
  }

  res.status(200).json({
    link: link,
    message: "Email sent successfully",
  });
});

export const getResetToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  try {
    const decrypt = decryptData(id);
    const user = await adminModel
      .findById(decrypt)
      .lean()
      .select("_id email updatedAt");

    if (!user) {
      res.status(400);
      throw new Error("Unauthorized access, User Not Found");
    }

    const secret = generateMagicSecret(user.updatedAt);
    const decoded = verifyMagicToken(token, secret);

    if (decoded._id !== user._id.toString()) {
      res.status(400);
      throw new Error("Invalid Token, please try again");
    }

    // generate a new token and compare it with the old one
    const newToken = generateMagicToken(
      { _id: user._id },
      process.env.MAGIC_SECRET
    );

    res.cookie("prch", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({
      id: user._id,
      email: user.email,
      message: "Reset Password",
    });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error(error);
  }
});

export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const data = req.prot;
  const { password } = req.body;

  // update the password
  const updatedCredentials = await adminModel.updateOne(
    { _id: data._id },
    { password: password }
  );

  if (!updatedCredentials) {
    res.status(400);
    throw new Error("Update Credentials Failed");
  }

  //kill the token
  res.cookie("prch", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    id: data._id,
    message: "Reset Password Successfully",
  });
});
