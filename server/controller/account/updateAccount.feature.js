import asyncHandler from "express-async-handler";
import adminModel from "../../models/adminModel.js";

const updateProfile = asyncHandler(async (req, res) => {
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

export default updateProfile;
