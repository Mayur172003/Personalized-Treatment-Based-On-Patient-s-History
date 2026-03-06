import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import { protectAdmin, JWT_SECRET } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ usern: username });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Wrong username/password combination' });
    }
    res.json({
      _id: admin._id,
      username: admin.usern,
      token: generateToken(admin._id),
      role: 'admin',
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/doctors', protectAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/doctors', protectAdmin, async (req, res) => {
  try {
    const { name, age, specialization, location, timings, loginId, password, ccc } = req.body;
    if (!name || !age || !specialization || !location || !timings || !loginId || !password) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const existing = await Doctor.findOne({ loginId });
    if (existing) return res.status(400).json({ message: 'Doctor with this login ID already exists' });
    const doctor = await Doctor.create({
      name,
      age: Number(age),
      specialization,
      location,
      timings,
      loginId,
      password,
      ccc: ccc || '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
    });
    res.status(201).json(doctor);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
