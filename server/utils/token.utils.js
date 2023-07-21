import jwt from "jsonwebtoken";

export const generateToken = (res, UID) => {
  // generating token
  const token = jwt.sign({ UID }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // storing token in cookie
  res.cookie("aut", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};