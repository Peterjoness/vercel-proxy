const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Proxy is running! Add ?url=example.com to use it.");
});

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    res.set(response.headers);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching URL: " + error.message);
  }
});

module.exports = app;
