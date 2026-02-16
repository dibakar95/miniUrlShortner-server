const fs = require("fs");
const path = require("path");
const db = require("../config/db");

async function initDb() {
  try {
    const schemaPath = path.join(__dirname, "../models/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    console.log("⏳ Connecting to database...");
    await db.query("SELECT NOW()"); // Simple connection test
    console.log("✅ Database connected!");

    console.log("⏳ Running schema...");
    await db.query(schemaSql);
    console.log("✅ Schema applied successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
    process.exit(1);
  }
}

initDb();
