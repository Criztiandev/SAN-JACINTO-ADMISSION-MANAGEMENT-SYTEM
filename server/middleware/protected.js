import asyncHandler from "express-async-handler";
import {
  getTokenFromCookies,
  validateTokenFromCookies,
} from "../utils/token.utils.js";
import adminModel from "../models/adminModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const cookieNames = ["aut", "prch"];
  let { name, token } = getTokenFromCookies(req.cookies, cookieNames);

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    req.session.user = validateTokenFromCookies(name, token);
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
