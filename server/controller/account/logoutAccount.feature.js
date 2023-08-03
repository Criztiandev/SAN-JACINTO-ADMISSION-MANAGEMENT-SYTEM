import asyncHandler from "express-async-handler";
import { deleteTokenFromCookies } from "../../utils/token.utils.js";
import sessionModel from "../../models/sessionModel.js";

const logout = asyncHandler(async (req, res) => {
  const SID = req.session.id;
  const UID = req.session.user._id;

  // delete session
  await sessionModel.deleteOne({ _id: SID });
  deleteTokenFromCookies(process.env.AUTH_NAME, res);

  // delete req.session;
  req.session = null;

  res.status(200).json({
    id: UID,
    message: "Logout User",
  });
});

export default logout;
