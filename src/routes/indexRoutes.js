const express = require("express");
const router = express.Router();
const { redirectToOriginal } = require("../controllers/urlController");

// --------------------------------------------------------------------
// 2. GET /:code
//    - Should find the long URL in DB
//    - Should redirect user to it
// --------------------------------------------------------------------
/**
 * @swagger
 * /{code}:
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

module.exports = router;
