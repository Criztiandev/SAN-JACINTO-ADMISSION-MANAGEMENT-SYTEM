import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";
import { deleteToken } from "../utils/token.utils.js";

export const viewProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    id: user._id,
    name: user.fullName,
    email: user.email,
    contact: user.contact,
    message: "Profile view",
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

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

export const deleteProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  await adminModel.deleteOne({ _id: _id });
  deleteToken(res);

  res.status(200).json({
    id: _id,
    message: "Deleted Succesfully",
  });
});
