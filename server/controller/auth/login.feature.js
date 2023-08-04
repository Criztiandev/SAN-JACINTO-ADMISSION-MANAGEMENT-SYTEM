import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";
import { generateToken } from "../../utils/token.utils.js";
import { storeTokenToCookies } from "../../utils/cookie.utils.js";
import sessionModel from "../../models/sessionModel.js";

const loginFeature = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findUser(
    { email, password },
    { exist: true, select: "all" }
  );

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
    storeTokenToCookies(res, process.env.AUTH_NAME, token);

    res.status(200).json({
      id: user._id,
      email: user.email,

      message: "User logged in successfully",
    });
  }
});

export default loginFeature;
