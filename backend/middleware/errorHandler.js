// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ message: "Duplicate field value entered" });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
  });
};

export default errorHandler;
