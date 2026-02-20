
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



CREATE TABLE IF NOT EXISTS clicks (
    id SERIAL PRIMARY KEY,
    url_id INTEGER REFERENCES urls(id),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    country VARCHAR(10)
);
