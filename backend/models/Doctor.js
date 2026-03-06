import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  specialization: { type: String, required: true },
  date: String,
  time: String,
  ccc: String,
  location: { type: String, required: true },
  timings: String,
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
