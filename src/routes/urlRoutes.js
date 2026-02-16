const express = require("express");
const router = express.Router();
const rateLimiter = require("../middlewares/rateLimiter");
const {
  createShortUrl,
  redirectToOriginal,
  getAnalytics,
} = require("../controllers/urlController");

// MENTORSHIP CHALLENGE: Route Handlers
// --------------------------------------------------------------------
// 1. POST /api/shorten
//    - Should generate a short code
//    - Should save to DB
//    - Should return the short URL
// --------------------------------------------------------------------
/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Shorten a URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original_url:
 *                 type: string
 *               expiresIn:
 *                 type: integer
 *               alias:
 *                 type: string
 *                 description: Custom short code (optional, max 20 chars)
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/shorten", rateLimiter, createShortUrl);

// --------------------------------------------------------------------
// 2. GET /:code
//    - Should find the long URL in DB
//    - Should redirect user to it
// --------------------------------------------------------------------
/**
 * @swagger
 * /api/{code}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: The short code
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: URL not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/:code", redirectToOriginal);

/**
 * @swagger
 * /api/analytics/{code}:
 *   get:
 *     summary: Get analytics for a short URL
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: The short code
 *     responses:
 *       200:
 *         description: Analytics for the short URL
 *       404:
 *         description: URL not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/:code", getAnalytics);

module.exports = router;
