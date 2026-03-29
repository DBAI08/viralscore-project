// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Initial static video list
let viralScores = [
  { video_id: "vid001", title: "Funny Cat Video", likes: 50, shares: 20, comments: 10, score: 120 },
  { video_id: "vid002", title: "Epic Fail Compilation", likes: 80, shares: 30, comments: 15, score: 110 },
  { video_id: "vid003", title: "Top 10 Hacks", likes: 40, shares: 25, comments: 5, score: 95 },
  { video_id: "vid004", title: "Travel Vlog", likes: 70, shares: 40, comments: 20, score: 88 },
  { video_id: "vid005", title: "Cooking Tutorial", likes: 60, shares: 15, comments: 8, score: 76 },
];

// API endpoint: randomizes numbers for “live” effect
app.get('/api/viral_scores', (req, res) => {
  const liveScores = viralScores.map(v => {
    const likes = Math.floor(Math.random() * 100);
    const shares = Math.floor(Math.random() * 50);
    const comments = Math.floor(Math.random() * 30);
    const score = likes + shares * 2 + comments * 3; // simple weighted formula
    return { ...v, likes, shares, comments, score };
  });
  res.json(liveScores);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});