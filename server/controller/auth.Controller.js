import asyncHandler from "express-async-handler";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
});
export const registerUser = asyncHandler(async (req, res) => {});
export const forgotPassword = asyncHandler(async (req, res) => {});
export const checkPoint = asyncHandler(async (req, res) => {});
