import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export async function connectDatabase() {
  if (db.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
}

export function isDatabaseConnected() {
  return db.readyState === 1;
}

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default db;
