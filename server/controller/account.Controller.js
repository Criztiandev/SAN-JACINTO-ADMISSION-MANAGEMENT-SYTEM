import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

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

  // update user credentials
  const updated = await adminModel.updateOne({ _id: _id }, req.body);

  if (!updated) {
    res.status(400);
    throw new Error("Update Credentials Failed");
  }

  res.status(200).json({
    id: updated._id,
    message: "Updated Successfully",
  });
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await adminModel.findByIdAndDelete(_id).select("_id").lean();
  if (!user) {
    res.status(400);
    throw new Error("Deleting Credetials Failed");
  }

  res.status(200).json({
    id: user._id,
    message: "Deleted Succesfully",
  });
});
