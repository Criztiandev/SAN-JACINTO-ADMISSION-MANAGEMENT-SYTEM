import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

export const authenticatedController = asyncHandler(async (req, res) => {
  const { UID } = req.params;
  const user = await adminModel
    .findById(UID)
    .lean()
    .select("-_id -password -createdAt -updatedAt");

  if (!user) throw new Error("User doesnt exist");

  res.status(200).json({
    payload: user,
    messge: "Fetched Successfully",
  });
});
