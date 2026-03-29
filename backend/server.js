// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Base videos
const viralScores = [
  { video_id: "vid001", title: "Alice" },
  { video_id: "vid002", title: "Bob" },
  { video_id: "vid003", title: "Charlie" },
  { video_id: "vid004", title: "Travel Vlog" },
  { video_id: "vid005", title: "Cooking Tutorial" },
];

// Helper to generate random numbers
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// API endpoint with randomized data
app.get('/api/viral_scores', (req, res) => {
  const randomizedScores = viralScores.map(v => ({
    video_id: v.video_id,
    title: v.title,
    likes: randomBetween(20, 100),
    shares: randomBetween(5, 50),
    comments: randomBetween(2, 30),
    score: randomBetween(50, 150)
  }));
  res.json(randomizedScores);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});