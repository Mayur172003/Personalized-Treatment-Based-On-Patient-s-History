import express from 'express';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
import { protectPatient, JWT_SECRET } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectPatient, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const doctor = await Doctor.findOne({ loginId });
    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ message: 'Wrong login ID/password' });
    }
    const token = jwt.sign(
      { id: doctor._id, loginId: doctor.loginId, role: 'doctor' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({
      _id: doctor._id,
      name: doctor.name,
      loginId: doctor.loginId,
      token,
      role: 'doctor',
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
