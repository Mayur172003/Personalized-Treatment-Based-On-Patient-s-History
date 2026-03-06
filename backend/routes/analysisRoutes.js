import express from 'express';
import Diabetes from '../models/Diabetes.js';
import Diet from '../models/Diet.js';
import Exercise from '../models/Exercise.js';
import { protectPatient } from '../middleware/authMiddleware.js';
import { computeAnalysis, validateAnalysisInput } from '../utils/predictionLogic.js';

const router = express.Router();

router.post('/', protectPatient, async (req, res) => {
  try {
    const username = req.user.username;
    const raw = {
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      insulin1: req.body.insulin1,
      insulin2: req.body.insulin2,
      glucose1: req.body.glucose1,
      glucose2: req.body.glucose2,
      diabetesPedigreeFunction: req.body.diabetesPedigreeFunction,
      bloodPressure1: req.body.bloodPressure1,
      bloodPressure2: req.body.bloodPressure2,
      haemoglobinA1C: req.body.haemoglobinA1C,
      oralGlucoseToleranceTest: req.body.oralGlucoseToleranceTest,
    };
    const errors = validateAnalysisInput(raw);
    if (errors.length) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    const now = new Date();
    const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const time = now.toTimeString().slice(0, 5);

    const result = computeAnalysis(raw);
    const diabetesRecord = await Diabetes.create({
      age: raw.age,
      height: raw.height,
      weight: raw.weight,
      insulin1: raw.insulin1,
      insulin2: raw.insulin2,
      glucose1: raw.glucose1,
      glucose2: raw.glucose2,
      diabetesPedigreeFunction: raw.diabetesPedigreeFunction,
      bloodPressure1: raw.bloodPressure1,
      bloodPressure2: raw.bloodPressure2,
      haemoglobinA1C: raw.haemoglobinA1C,
      oralGlucoseToleranceTest: raw.oralGlucoseToleranceTest,
      prediction: result.prediction,
      username,
      date,
      time,
    });
    await Diet.create({
      ...result.diet,
      username,
      date,
      time,
    });
    await Exercise.create({
      ...result.exercise,
      username,
      date,
      time,
    });
    res.status(201).json({
      prediction: result.prediction,
      diet: result.diet,
      exercise: result.exercise,
      record: diabetesRecord,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/history', protectPatient, async (req, res) => {
  try {
    const list = await Diabetes.find({ username: req.user.username }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
