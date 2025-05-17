import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();
const ObjectId = mongodb.ObjectId;

let reviewsCollection;

router.use((req, res, next) => {
  if (!reviewsCollection) {
    const client = req.app.locals.dbClient;
    if (!client) {
      return res.status(500).json({ error: "Database client not connected" });
    }
    const db = client.db('movie_reviews_db');
    reviewsCollection = db.collection('reviews');
  }
  next();
});

// POST a review
router.post('/', async (req, res) => {
  try {
    const { movieId, user, review } = req.body;
    const result = await reviewsCollection.insertOne({ movieId, user, review, date: new Date() });
    res.json({ message: "Review added!", id: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await reviewsCollection.find().toArray();
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

export default router;
