import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'myfitness-secret-change-in-production';

export const protectPatient = async (req, res, next) => {
  let token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    req.role = 'patient';
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export const protectAdmin = async (req, res, next) => {
  let token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(401).json({ message: 'Admin not found' });
    req.user = admin;
    req.role = 'admin';
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export const protectDoctor = async (req, res, next) => {
  let token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'doctor') return res.status(403).json({ message: 'Doctor only' });
    req.user = { id: decoded.id, loginId: decoded.loginId };
    req.role = 'doctor';
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export { JWT_SECRET };
