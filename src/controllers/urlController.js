const db = require("../config/db");

// Controller: urlController.js
// Holds the business logic for URL operations

const createShortUrl = async (req, res) => {
  const { original_url, expiresIn } = req.body;

  // Validate input (is it a valid URL?)
  if (!original_url) {
    return res.error("Original URL is required", 400);
  }
  // Generate a short code (random string?)
  const short_code = Math.random().toString(36).substring(2, 8);
  // expirationDate = current time + expiresIn (in hours)
  const expirationDate = expiresIn
    ? new Date(Date.now() + expiresIn * 3600000)
    : null;
  // Insert into database
  const query = `INSERT INTO urls (original_url, short_code, expires_at) VALUES ($1, $2, $3)`;
  await db.query(query, [original_url, short_code, expirationDate]);

  res.success({ short_url: `http://localhost:3000/${short_code}` });
};

const redirectToOriginal = async (req, res) => {
  const { code } = req.params;

  // SELECT original_url FROM urls WHERE short_code = code
  const query = `SELECT original_url FROM urls WHERE short_code = $1`;
  const result = await db.query(query, [code]);
  // If not found, res.status(404).json(...)
  if (result.rows.length === 0) {
    return res.error("URL not found", 404);
  }
  if (result.rows[0].expires_at < new Date()) {
    return res.error("URL expired", 404);
  }
  // Increment click count
  const updateQuery = `UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1`;
  await db.query(updateQuery, [code]);
  // If found, res.redirect(original_url)
  res.redirect(result.rows[0].original_url);
};

const getAnalytics = async (req, res) => {
  const { code } = req.params;

  const query = `SELECT * FROM urls WHERE short_code = $1`;
  const result = await db.query(query, [code]);

  // If not found, res.status(404).json(...)
  if (result.rows.length === 0) {
    return res.error("URL not found", 404);
  }
  if (result.rows[0].expires_at < new Date()) {
    return res.error("URL expired", 404);
  }
  res.success({
    original_url: result.rows[0].original_url,
    short_code: result.rows[0].short_code,
    created_at: result.rows[0].created_at,
    expires_at: result.rows[0].expires_at,
    click_count: result.rows[0].click_count,
  });
};

module.exports = {
  createShortUrl,
  redirectToOriginal,
  getAnalytics,
};
