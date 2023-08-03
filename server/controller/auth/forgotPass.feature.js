import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";
import { generateToken, generateSecret } from "../../utils/token.utils.js";
import { sendEmail } from "../../utils/email.uitls.js";
import { encryptData } from "../../utils/encryption.utils.js";

const forgotPassFeature = asyncHandler(async (req, res) => {
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

  const encryptedID = encryptData(user._id.toString());
  const link = `${process.env.FGT_BASE}${encryptedID}/${token}`;

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

export default forgotPassFeature;
