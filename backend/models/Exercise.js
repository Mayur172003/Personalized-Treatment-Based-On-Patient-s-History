import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  e1: String,
  e2: String,
  e3: String,
  e4: String,
  e5: String,
  e6: String,
  e7: String,
  e8: String,
  e9: String,
  e10: String,
  e11: String,
  total: Number,
  username: { type: String, required: true },
  date: String,
  time: String,
}, { timestamps: true });

export default mongoose.model('Exercise', exerciseSchema);
