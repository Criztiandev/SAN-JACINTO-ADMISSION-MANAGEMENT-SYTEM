import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/token.utils.js";
import adminModel from "../models/adminModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.aut || null;

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    const decoded = verifyToken(token);

    // if you want to dynamic validate its role

    const user = await adminModel
      .findById(decoded.UID)
      .select("-password")
      .lean();

    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
