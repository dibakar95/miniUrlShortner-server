/**
 * Middleware to attach standard response helpers to the 'res' object.
 *
 * Usage:
 * res.success(data, "Optional message", 200)
 * res.error("Error message", 400, "OPTIONAL_ERROR_CODE")
 */
const responseHandler = (req, res, next) => {
  // Helper for Success Responses
  res.success = (data = null, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  // Helper for Error Responses
  res.error = (
    message = "Internal Server Error",
    statusCode = 500,
    error = null,
  ) => {
    const response = {
      success: false,
      message,
    };
    if (error) response.error = error;

    res.status(statusCode).json(response);
  };

  next();
};

module.exports = responseHandler;
