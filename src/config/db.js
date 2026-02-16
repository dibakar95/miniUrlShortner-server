const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If connectionString is present, these others are ignored by pg,
  // but we keep them for local dev where DATABASE_URL might not be set.
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
