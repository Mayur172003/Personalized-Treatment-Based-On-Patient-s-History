import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  d1: String,
  d2: String,
  d3: String,
  d4: String,
  d5: String,
  total: Number,
  username: { type: String, required: true },
  date: String,
  time: String,
}, { timestamps: true });

export default mongoose.model('Diet', dietSchema);
