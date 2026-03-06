import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myfitness');
  const exists = await Admin.findOne({ usern: 'admin' });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
    return;
  }
  await Admin.create({
    email: 'admin@myfitness.org',
    usern: 'admin',
    password: 'admin',
  });
  console.log('Admin created: username=admin, password=admin');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
