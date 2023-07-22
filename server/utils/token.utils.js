import jwt from "jsonwebtoken";

export const generateToken = (res, UID) => {
  // generating token
  const token = jwt.sign({ UID }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // storing token in cookie
  res.cookie(process.env.TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const generateMagicToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: "15m" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// delete token
export const deleteToken = (res) => {
  res.cookie(process.env.TOKEN_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
