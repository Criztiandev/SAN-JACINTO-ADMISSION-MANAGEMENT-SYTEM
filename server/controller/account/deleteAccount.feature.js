import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";
import { deleteTokenFromCookies } from "../../utils/token.utils.js";
import sessionModel from "../../models/sessionModel.js";

const deleteProfile = asyncHandler(async (req, res) => {
  const { _id } = req.session.user;
  const SID = req.session.id;

  await adminModel.deleteOne({ _id: _id });
  await sessionModel.deleteOne({ _id: SID });
  deleteTokenFromCookies(process.env.AUTH_NAME, res);

  req.session = null;

  res.status(200).json({
    id: _id,
    message: "Deleted Succesfully",
  });
});

export default deleteProfile;
