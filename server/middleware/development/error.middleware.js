export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  if (err.name === "CastError" || err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resources not found";
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENVI === "production" ? null : err.stack,
  });
};
