# URL Shortener Microservice

Goal: Build a tiny URL shortener similar to:
https://url-shortener-microservice.freecodecamp.rocks/

What I focused on :
- Really understanding how `dns.lookup()` behaves (returns, errors).
- Reading the Node.js DNS docs: https://nodejs.org/docs/v22.18.0/api/dns.html#dns
- Validating and parsing with the native `URL` object (no external lib).

How it works (flow):
- client sends a POST to `/api/shorturl` with a form field `url`.
- i parse it with `new URL(input)`. (Right now if it throws, Express will return 500; could wrap in try/catch to return a cleaner `{ error: "invalid url" }`.)
- I run `dns.lookup(hostname)` to be sure the domain resolves. If it does not: `{ "error": "invalid url" }`.
- I store an object `{ original_url, short_url }` in an in‑memory array. `short_url` is an auto‑incrementing integer.
- I return that object as JSON.
- For `GET /api/shorturl/:id` I look it up and redirect with `res.redirect(...)`.

Examples: 

- Create:
```
POST /api/shorturl
url=https://example.com/some/path
```

- Success response:
```json
{ "original_url": "https://example.com/some/path", "short_url": 1 }
```

- Redirect:
```
GET /api/shorturl/1  -> 302 to https://example.com/some/path
```

- invalid domain or empty body
```json
{ "error": "invalid url" }
```

Storage:
- Simple in‑memory array: `shortStore = []`.
- Lost on server restart (fine for the exercise).
- No collision handling (id = length + 1).

Summary:
- Create endpoint: POST `/api/shorturl` (field: `url`).
- Redirect endpoint: GET `/api/shorturl/:id`.
- Validation: native URL parsing + DNS resolution.
- Storage: volatile memory.