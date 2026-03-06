/**
 * Handles unmatched routes and returns a standardized 404 response.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

module.exports = notFound;