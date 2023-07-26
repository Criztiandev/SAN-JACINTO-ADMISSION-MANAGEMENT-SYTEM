import asyncHandler from "express-async-handler";
import {
  getTokenFromCookies,
  validateTokenFromCookies,
} from "../utils/cookie.utils.js";

export const protect = asyncHandler(async (req, res, next) => {
  const cookieNames = ["aut", "prch"];
  let { name, token } = getTokenFromCookies(req.cookies, cookieNames);

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    const res = validateTokenFromCookies(name, token);
    req.session.id = res;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
