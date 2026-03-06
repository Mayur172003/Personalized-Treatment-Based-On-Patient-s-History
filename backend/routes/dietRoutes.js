import express from 'express';
import Diet from '../models/Diet.js';
import { protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectPatient, async (req, res) => {
  try {
    const list = await Diet.find({ username: req.user.username }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
