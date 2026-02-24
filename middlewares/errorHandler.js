/**
 * Centralized error-handling middleware.
 * Returns consistent API response format and logs internal errors without exposing details.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid ID format";
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate value";
  }

  if (statusCode === 500) {
    console.error("[Error]", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
