import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";
import {
  generateToken,
  generateSecret,
  verifyToken,
  deleteTokenFromCookies,
} from "../../utils/token.utils.js";
import { storeTokenToCookies } from "../../utils/cookie.utils.js";
import { decryptData } from "../../utils/encryption.utils.js";
import sessionModel from "../../models/session.Model.js";

// combine the token based and session based authentication

export const getResetToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const decrypt = decryptData(id);
  const user = await adminModel.findUser(
    { _id: decrypt },
    { exist: true, select: "_id email updatedAt" }
  );

  const session = await sessionModel.findSession({ UID: decrypt });
  if (session) await session.deleteOne({ _id: session._id });

  deleteTokenFromCookies("aut", res);

  const secret = generateSecret({ token: null, secret: user.updatedAt });
  const decoded = verifyToken(token, secret);

  const newToken = generateToken(decoded._id, process.env.MAGIC_SECRET, "15m");
  storeTokenToCookies(res, "fgt", newToken);

  res.status(200).json({
    id: user._id,
    message: "Reset Password",
  });
});

export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const user = await adminModel.findUser(
    { _id: req.session._id },
    { exist: true, select: "_id password" }
  );
  const { password } = req.body;

  //   // update the password
  const updatedCredentials = await adminModel.updateOne(
    { _id: user._id },
    { password: password }
  );

  if (!updatedCredentials) {
    res.status(400);
    throw new Error("Update Credentials Failed");
  }
  //kill the token
  deleteTokenFromCookies("fgt", res);

  res.status(200).json({
    id: user._id,
    message: "Reset Password Successfully",
  });
});
