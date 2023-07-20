export const requestBodyValidation = (req, res, next) => {
  console.log(req.body.length);
  if (Object.keys(req.body).length === 0 || req.body.constructor === Object) {
    res.status(400);
    throw new Error("Invalid request body");
  }

  next();
};
