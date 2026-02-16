const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
const urlRoutes = require("./routes/urlRoutes");
const responseHandler = require("./middlewares/responseHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Enable trust proxy for rate limiting (X-Forwarded-For)
app.set("trust proxy", 1);
// Attach response helpers to 'res'
app.use(responseHandler);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Mount the routes
app.use("/api", urlRoutes);
app.get("/", (req, res) => {
  res.send("URL Shortener API is running...");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
