import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: String,
  contact: String,
  date: String,
  timing: String,
  username: { type: String, required: true },
  dob: String,
  tob: String,
  location: String,
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
