import express from 'express';
import Appointment from '../models/Appointment.js';
import { protectPatient, protectDoctor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectPatient, async (req, res) => {
  try {
    const list = await Appointment.find({ username: req.user.username }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', protectPatient, async (req, res) => {
  try {
    const { name, contact, date, timing, dob, tob, location } = req.body;
    const appointment = await Appointment.create({
      name,
      contact,
      date,
      timing,
      username: req.user.username,
      dob: dob || '',
      tob: tob || '',
      location: location || '',
    });
    res.status(201).json(appointment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/doctor', protectDoctor, async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
