import asyncHandler from "express-async-handler";
import {
  getTokenFromCookies,
  validateTokenFromCookies,
} from "../utils/cookie.utils.js";

export const protect = asyncHandler(async (req, res, next) => {
  const cookieNames = ["aut", "prch"];
  let _token = getTokenFromCookies(req.cookies, cookieNames);

  if (!_token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    const { name, token } = _token;
    const result = validateTokenFromCookies(name, token);
    req.session = { id: result._id };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
