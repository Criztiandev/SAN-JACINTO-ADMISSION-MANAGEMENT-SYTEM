import asyncHandler from "express-async-handler";

export const customError = asyncHandler(async (req, res, next) => {
  const errorMaps = {
    401: "Not Authorized",
    404: "Not Found",
  };

  const error = new Error(`${errorMaps[req.statusCode]} - ${req.originalUrl}`);
  res.status(req.statusCode);
  next(error);
});

export const errorHandler = asyncHandler(async (err, req, res, next) => {
  const statusCode = req.statusCode === 200 ? 500 : req.statusCode;
  const message = err.message;

  if (err.name === "CastError" || err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resources not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENVI === "production" ? null : err.stack,
  });
});
