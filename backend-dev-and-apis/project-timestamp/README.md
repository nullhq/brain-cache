# Timestamp Microservice

Goal: build a tiny version of the official example [here](https://timestamp-microservice.freecodecamp.rocks)

What I focused on:
- Really understanding the Date object (`new Date()`, `valueOf()`, `Date.parse()`, `toUTCString()`).
- Optional route param in Express with `/api/:date?` (the `?` makes it optional).
- Simple branch: no param -> current date; with param -> try to parse.
- Reusing built‑in Date methods instead of writing custom parsing.
- Returning only what the project expects:
  - Success: `{ "unix": <number>, "utc": "<UTC string>" }`
  - Error: `{ "error": "Invalid Date" }`

My route (current version):
```js
app.get("/api/:date?", function (req, res) {
  let date;
  if (req.params.date) {
    date = new Date(isNaN(Number(req.params.date)) ? req.params.date : Number(req.params.date));
    if (isNaN(date.valueOf())) {
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  } else {
    date = new Date();
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }
});
```

How it works (simple logic):
- If there is a param:
  - If it looks numeric -> `Number(...)` then `new Date(number)`.
  - Else pass the raw string to `new Date()`.
  - If invalid -> `{ error: "Invalid Date" }`.
- If no param -> current date.

Examples:
- GET `/api` -> current date
- GET `/api/2015-12-25` -> parse date string
- GET `/api/1450137600000` -> treat as ms timestamp
- GET `/api/abcxyz` -> `{ "error": "Invalid Date" }`