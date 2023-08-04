import asyncHandler from "express-async-handler";
import {
  getTokenFromCookies,
  validateTokenFromCookies,
} from "../../utils/cookie.utils.js";

export const protect = asyncHandler(async (req, res, next) => {
  const route = req.route.path;

  //! add obfuscate to the cookie name
  const cookieName =
    route === "/checkpoint/verify"
      ? process.env.FORGOT_PASS_NAME
      : process.env.AUTH_NAME;

  let _token = getTokenFromCookies(req, cookieName);

  if (!_token) {
    res.status(401);
    throw new Error("Unauthorized access, please login");
  }

  try {
    const result = validateTokenFromCookies(cookieName, _token);
    req.session = { _id: result._id };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token, please login");
  }
});
