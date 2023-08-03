import { verifyToken } from "./token.utils.js";

export const storeTokenToCookies = (res, name, token) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const getTokenFromCookies = (req, cookieNames) => {
  return req.cookies[cookieNames] || null;
};

export const validateTokenFromCookies = (
  name,
  token,
  { auth = "JWT_SECRET", fgt = "MAGIC_SECRET" } = {}
) => {
  return verifyToken(token, process.env[fgt || auth][name]);
};

export const removeTokenFromCookies = (res, name) => {
  res.cookie(name, "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
