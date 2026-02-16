-- -------------------------------------------------------------
-- MENTORSHIP CHALLENGE: Database Schema Design
-- -------------------------------------------------------------
-- Instructions: 
-- Replace the comments below with the actual SQL column definitions.
-- Think about data types (VARCHAR, TEXT, INT, TIMESTAMP, etc.)
-- Think about constraints (NOT NULL, UNIQUE, DEFAULT)
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS urls (
    id SERIAL PRIMARY KEY,

    -- 1. Store the original long URL.
    original_url TEXT NOT NULL,
    -- 2. Store the short code (alias). This MUST be unique.
    short_code VARCHAR(20) NOT NULL UNIQUE,
    -- 3. Store the creation time.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- 4. Store the expiration time (optional, so it can be NULL).
    expires_at TIMESTAMP,
    -- 5. Simple click count (Optional: We might move this to a separate table for advanced analytics)
    click_count INT DEFAULT 0
);


-- -------------------------------------------------------------
-- ADVANCED CHALLENGE (Optional)
-- If we want to track "Geo Location" or "Time of Click" later,
-- a simple 'click_count' in the 'urls' table won't be enough.
-- We would need a separate 'clicks' table.
-- -------------------------------------------------------------

-- CREATE TABLE clicks (
--     id SERIAL PRIMARY KEY,
--     url_id INTEGER REFERENCES urls(id),
--     clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     ip_address VARCHAR(45)
-- );
