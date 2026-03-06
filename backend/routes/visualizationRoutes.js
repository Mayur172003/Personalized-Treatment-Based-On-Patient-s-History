import express from 'express';
import Diet from '../models/Diet.js';
import Diabetes from '../models/Diabetes.js';
import { protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/diet', protectPatient, async (req, res) => {
  try {
    const list = await Diet.find({ username: req.user.username }).sort({ createdAt: 1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/diabetes', protectPatient, async (req, res) => {
  try {
    const list = await Diabetes.find({ username: req.user.username }).sort({ createdAt: 1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
