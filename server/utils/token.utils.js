import jwt from "jsonwebtoken";

export const generateSecret = (token, secret) => {
  return secret + token + 10000;
};

export const generateToken = (UID, secret, expires) => {
  return jwt.sign({ _id: UID }, secret, { expiresIn: expires || "1d" });
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret, { ignoreExpiration: false });
  } catch (error) {
    throw new Error("Invalid or Expired Token");
  }
};

export const deleteTokenFromCookies = (name, res) => {
  res.cookie(name, "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

// Protected Route Token Utils
