from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///viral.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Video model
class Video(db.Model):
    video_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)

# ViralScore model
class ViralScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.String, db.ForeignKey('video.video_id'))
    score = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    shares = db.Column(db.Integer, default=0)
    comments = db.Column(db.Integer, default=0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

# Initialize tables (run manually once)
def initialize_database():
    db.create_all()
    # Check if sample video exists
    if not Video.query.filter_by(video_id="vid001").first():
        v = Video(video_id="vid001", title="Funny Cat Video", url="https://youtu.be/cat001")
        db.session.add(v)
        s = ViralScore(video_id="vid001", score=150, likes=50, shares=20, comments=5)
        db.session.add(s)
        db.session.commit()
        print("Sample video and score added.")

# API endpoint
@app.route('/api/viral_scores')
def get_scores():
    scores = ViralScore.query.all()
    return jsonify([{
        'video_id': s.video_id,
        'score': s.score,
        'likes': s.likes,
        'shares': s.shares,
        'comments': s.comments
    } for s in scores])

if __name__ == '__main__':
    # Initialize database and sample data
    with app.app_context():
        initialize_database()
    app.run(port=8080)