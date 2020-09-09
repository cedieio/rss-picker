const express = require('express');
const router = express.Router();
const rss_parser = require('rss-parser');
const parser = new rss_parser();

router.post('/', async function (req, res) {
  try {
    let feed = await parser.parseURL('https://www.nasa.gov/rss/dyn/breaking_news.rss');
    res.send(feed);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;