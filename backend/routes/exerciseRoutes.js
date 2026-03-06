import express from 'express';
import Exercise from '../models/Exercise.js';
import { protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectPatient, async (req, res) => {
  try {
    const list = await Exercise.find({ username: req.user.username }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
