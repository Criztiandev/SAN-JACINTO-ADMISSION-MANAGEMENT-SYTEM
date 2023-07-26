import asyncHandler from "express-async-handler";
import sessionModel from "../models/sessionModel.js";

export const validateSession = asyncHandler(async (req, res, next) => {
  const SID = req.session.id;

  // check if the session is valid
  const session = await sessionModel.findOne({ _id: SID }).lean();
  if (!session) {
    res.status(401);
    throw new Error("Invalid session, please login");
  }

  // check if the session is active
  if (!session.status) {
    res.status(401);
    throw new Error("Session is inactive, please login");
  }

  req.session = { id: SID, user: session.UID };
  next();
});
