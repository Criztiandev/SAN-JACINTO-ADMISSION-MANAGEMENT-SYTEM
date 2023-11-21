export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "MongoServerError") {
    message = `Error: ${Object.keys(err.keyValue)[0].substring(
      Object.keys(err.keyValue)[0].indexOf(".") + 1
    )} already exists, please try again`;
  }

  if (err.name === "CastError" || err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
