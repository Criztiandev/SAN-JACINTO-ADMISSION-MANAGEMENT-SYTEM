import asyncHandler from "express-async-handler";
import sessionModel from "../../models/session.Model.js";

export const validateSession = asyncHandler(async (req, res, next) => {
  const SID = req.session._id;

  // check if the session is valid
  const session = await sessionModel.findOne({ _id: SID }).lean();
  if (!session) {
    res.status(401);
    throw new Error("Invalid session, please login");
  }

  req.session = { SID: SID, user: session.UID };
  next();
});
