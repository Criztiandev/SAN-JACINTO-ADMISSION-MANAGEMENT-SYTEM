import asyncHandler from "express-async-handler";

export const viewProfile = asyncHandler(async (req, res) => {
  const UID = req.user;

  res.status(200).json({
    id: UID,
    message: "Profile view",
  });
});
export const updateProfile = asyncHandler(async (req, res) => {});
export const deleteProfile = asyncHandler(async (req, res) => {});
