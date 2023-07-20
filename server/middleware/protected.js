import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/token.utils.js";

export const protectedRoute = asyncHandler(async (req, res, next) => {
  let token = req.cookies.aut || null;

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.UID;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
