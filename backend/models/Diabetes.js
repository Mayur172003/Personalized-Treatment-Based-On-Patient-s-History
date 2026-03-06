import mongoose from 'mongoose';

const diabetesSchema = new mongoose.Schema({
  age: Number,
  height: Number,
  weight: Number,
  insulin1: Number,
  insulin2: Number,
  glucose1: Number,
  glucose2: Number,
  diabetesPedigreeFunction: Number,
  bloodPressure1: Number,
  bloodPressure2: Number,
  haemoglobinA1C: Number,
  oralGlucoseToleranceTest: Number,
  prediction: { type: String, enum: ['Healthy/ No Diabetes', 'Prediabetic', 'Diabetic'] },
  username: { type: String, required: true },
  date: String,
  time: String,
}, { timestamps: true });

export default mongoose.model('Diabetes', diabetesSchema);
