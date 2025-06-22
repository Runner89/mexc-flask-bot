const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Optional: JSON body parsing, falls du JSON im Request willst
app.use(express.json());

app.post('/ping', async (req, res) => {
  const targetUrl = 'https://api.mexc.com/api/v3/time';
  const start = Date.now();

  try {
    await axios.get(targetUrl, { timeout: 5000 });
    const latency = Date.now() - start;

    const location = process.env.LOCATION || "unknown";

    const result = {
      location: location,
      timestamp: new Date().toISOString(),
      latency_ms: latency
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({
      location: process.env.LOCATION || "unknown",
      timestamp: new Date().toISOString(),
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Latency server running on port ${port}`);
});
