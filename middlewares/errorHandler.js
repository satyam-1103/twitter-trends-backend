// middlewares/errorHandler.js
/**
 * Centralized error handling middleware.
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

export default errorHandler;
