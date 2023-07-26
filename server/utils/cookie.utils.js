import { verifyToken } from "./token.utils.js";

export const storeTokenToCookies = (res, name, token) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const getTokenFromCookies = (cookies, cookieNames) => {
  for (const name of cookieNames) {
    const token = cookies[name];
    if (token) return { name, token };
  }

  return null;
};

export const validateTokenFromCookies = (name, token) => {
  const secrets = { aut: "JWT_SECRET", fgt: "MAGIC_SECRET" };

  return verifyToken(token, process.env[secrets[name]]);
};

export const removeTokenFromCookies = (res, name) => {
  res.cookie(name, "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
