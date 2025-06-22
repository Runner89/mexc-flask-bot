// ping.js
const axios = require('axios');

async function measureLatency() {
  const targetUrl = 'https://api.mexc.com/api/v3/time';
  const start = Date.now();

  try {
    await axios.get(targetUrl, { timeout: 5000 }); // max 5s warten
    const latency = Date.now() - start;

    const result = {
      location: process.env.LOCATION || "unknown",
      timestamp: new Date().toISOString(),
      latency_ms: latency
    };

    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({
      location: process.env.LOCATION || "unknown",
      timestamp: new Date().toISOString(),
      error: err.message
    }));
  }
}

measureLatency();
