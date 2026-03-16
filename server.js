const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ── ESPN PROXY ─────────────────────────────────────────────────
// Cache for 30 seconds to avoid hammering ESPN
let scoreCache = null;
let cacheTime = 0;
const CACHE_TTL = 30000;

app.get('/api/scores', async (req, res) => {
  try {
    const now = Date.now();
    if (scoreCache && (now - cacheTime) < CACHE_TTL) {
      return res.json(scoreCache);
    }

    const url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=100&limit=100';
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) throw new Error(`ESPN returned ${response.status}`);

    const data = await response.json();
    scoreCache = data;
    cacheTime = now;

    res.json(data);
  } catch (err) {
    console.error('ESPN proxy error:', err.message);
    // Return cached data if available, even if stale
    if (scoreCache) return res.json(scoreCache);
    res.status(502).json({ error: 'Could not reach ESPN', events: [] });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Survivor Pool running on port ${PORT}`);
});
