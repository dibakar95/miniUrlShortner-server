const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini URL Shortener API",
      version: "1.0.0",
      description: "A simple URL shortener API with analytics",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "API Server",
      },
    ],
  },
  // Path to the API docs (where we will write our JSDoc comments)
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
