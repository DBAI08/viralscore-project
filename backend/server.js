// server.js
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Sample viral scores data
let viralScores = [
  { video_id: "vid001", title: "Funny Cat Video", likes: 50, shares: 20, comments: 10, score: 120 },
  { video_id: "vid002", title: "Epic Fail Compilation", likes: 80, shares: 30, comments: 15, score: 110 },
  { video_id: "vid003", title: "Top 10 Hacks", likes: 40, shares: 25, comments: 5, score: 95 },
  { video_id: "vid004", title: "Travel Vlog", likes: 70, shares: 40, comments: 20, score: 88 },
  { video_id: "vid005", title: "Cooking Tutorial", likes: 60, shares: 15, comments: 8, score: 76 },
];

// API endpoint with simulated live updates
app.get('/api/viral_scores', (req, res) => {
  viralScores = viralScores.map(video => ({
    ...video,
    likes: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50),
    comments: Math.floor(Math.random() * 30),
    score: Math.floor(Math.random() * 150 + 50)
  }));
  res.json(viralScores);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});