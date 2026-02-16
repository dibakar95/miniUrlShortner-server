# Mini URL Shortener API 🔗

A robust, production-ready URL Shortener API built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **URL Shortening**: Convert long URLs into compact, shareable links.
- **Redirection**: Instant 302 redirects to original URLs.
- **Analytics**: Track click counts for every link.
- **Expiration**: Links can self-destruct after a set time.
- **Custom Aliases**: Users can choose their own short codes (e.g., `/my-link`).
- **Rate Limiting**: Protected against abuse (100 reqs / 15 min).
- **Documentation**: Interactive API docs via Swagger UI.
- **Docker Ready**: (Coming soon)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Testing**: Jest & Supertest
- **Docs**: Swagger / OpenAPI

## 📦 Installation

1.  **Clone the repo:**

    ```bash
    git clone https://github.com/yourusername/miniUrlShortner-server.git
    cd miniUrlShortner-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Database:**
    - Create a Postgres database named `miniurlshortener`.
    - Copy `.env.example` to `.env` and fill in your credentials.

    ```bash
    cp .env.example .env
    ```

    - Run the initialization script:

    ```bash
    node src/scripts/initDb.js
    ```

4.  **Run the server:**
    ```bash
    npm run dev
    ```

## 📖 API Documentation

Visit `http://localhost:3000/api-docs` to see the interactive Swagger UI.

### Key Endpoints:

- `POST /api/shorten`: Create a short link.
  - Body: `{ "original_url": "https://google.com", "expiresIn": 24, "alias": "my-google" }`
- `GET /:code`: Redirect to original URL.
- `GET /api/analytics/:code`: View click stats.

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

## 📄 License

Apache-2.0
