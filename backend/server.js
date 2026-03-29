// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Original video data with static titles
let viralScores = [
  { video_id: "vid001", title: "Funny Cat Video", likes: 50, shares: 20, comments: 10, score: 120 },
  { video_id: "vid002", title: "Epic Fail Compilation", likes: 80, shares: 30, comments: 15, score: 110 },
  { video_id: "vid003", title: "Top 10 Hacks", likes: 40, shares: 25, comments: 5, score: 95 },
  { video_id: "vid004", title: "Travel Vlog", likes: 70, shares: 40, comments: 20, score: 88 },
  { video_id: "vid005", title: "Cooking Tutorial", likes: 60, shares: 15, comments: 8, score: 76 },
];

// Helper function to randomize numbers
function randomizeNumbers(video) {
  return {
    ...video,
    likes: Math.floor(Math.random() * 100),    // 0-99 likes
    shares: Math.floor(Math.random() * 50),    // 0-49 shares
    comments: Math.floor(Math.random() * 30),  // 0-29 comments
    score: Math.floor(Math.random() * 150),    // 0-149 score
  };
}

// API endpoint
app.get('/api/viral_scores', (req, res) => {
  const randomizedVideos = viralScores.map(randomizeNumbers);
  res.json(randomizedVideos);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});