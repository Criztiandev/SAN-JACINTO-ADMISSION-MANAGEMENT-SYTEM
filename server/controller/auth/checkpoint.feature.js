import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";
import {
  generateToken,
  generateSecret,
  verifyToken,
} from "../../utils/token.utils.js";
import { storeTokenToCookies } from "../../utils/cookie.utils.js";
import { decryptData } from "../../utils/encryption.utils.js";

// combine the token based and session based authentication

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

    const secret = generateSecret({ token: null, secret: user.updatedAt });
    const decoded = verifyToken(token, secret);

    if (decoded._id !== user._id.toString()) {
      res.status(400);
      throw new Error("Unauthorized access, Invalid token");
    }

    const newToken = generateToken(
      decoded._id,
      process.env.MAGIC_SECRET,
      "15m"
    );
    storeTokenToCookies(res, "fgt", newToken);

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
