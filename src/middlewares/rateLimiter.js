const expressRateLimit = require("express-rate-limit");

const rateLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" ? 5 : 100, // Limit each IP to 100 requests (5 in test)
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

module.exports = rateLimiter;
