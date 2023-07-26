export const validation = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Invalid request body");
  }
  return next();
};
