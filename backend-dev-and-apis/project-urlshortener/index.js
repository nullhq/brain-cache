require('dotenv').config();
const dns = require('dns');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const shortStore = [];

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST an URL and get the short code
app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  if (url) {
    const parsedURL = new URL(url);
    dns.lookup(parsedURL.hostname, function(err, address, family) {
      if (err) {
        return res.json({ error: 'invalid url'});
      }

      const short = { original_url: url, short_url: shortStore.length + 1 };
      const checkIfShortAlreadyExist = shortStore.find((s) => s.original_url === short.original_url);
      if (checkIfShortAlreadyExist) {
        return res.json(checkIfShortAlreadyExist);
      }

      shortStore.push(short);
      res.json(short);
    });
  } else {
    res.json({ error: 'invalid url'});
  }
});

// redirect to the original URL
app.get('/api/shorturl/:short', function(req, res) {
  let short_url = req.params.short;
  if (!isNaN(Number(short_url))) {
    short_url = Number(short_url);
    let getOriginalURL = shortStore.find((s) => s.short_url === short_url);
    if (getOriginalURL) {
      return res.redirect(getOriginalURL.original_url);
    }
    res.json({error:"No short URL found for the given input"});
  } else {
    res.json({error:"Wrong format"});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
