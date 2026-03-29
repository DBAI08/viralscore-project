from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to fetch

# Sample data
viral_scores = [
    {"video_id": "vid001", "score": 150, "likes": 50, "shares": 20},
    {"video_id": "vid002", "score": 120, "likes": 40, "shares": 15}
]

@app.route("/api/viral_scores")
def get_scores():
    return jsonify(viral_scores)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)