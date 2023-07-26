import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import { deleteTokenFromCookies } from "../utils/token.utils.js";
import sessionModel from "../models/sessionModel.js";

export const viewProfile = asyncHandler(async (req, res) => {
  const user = req.session.user;
  res.status(200).json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { _id } = req.session.user;

  const updated = await adminModel.updateOne({ _id: _id }, req.body);
  if (!updated) {
    res.status(400);
    throw new Error("Update Credentials Failed");
  }
  res.status(200).json({
    id: _id,
    message: "Updated Successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
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

export const deleteProfile = asyncHandler(async (req, res) => {
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
