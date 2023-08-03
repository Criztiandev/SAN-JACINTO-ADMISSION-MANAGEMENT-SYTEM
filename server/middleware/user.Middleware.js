import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

export const validateUser = asyncHandler(async (req, res, next) => {
  const UID = req.session.user;

  const user = await adminModel
    .findOne({ _id: UID })
    .lean()
    .select("-password");
  if (!user) {
    res.status(401);
    throw new Error("Invalid user, please login");
  }

  req.session = { ...req.session, user: user };
  next();
});
