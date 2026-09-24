import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const [alex, jordan] = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Rivera' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Lee' },
    ]);
    const team = await Team.create({ name: 'Trail Blazers', description: 'Mergington distance crew', memberIds: [alex._id, jordan._id] });
    await User.updateMany({ _id: { $in: [alex._id, jordan._id] } }, { teamId: team._id });
    await Activity.create([
      { userId: alex._id, type: 'running', durationMinutes: 30, distanceKm: 4.2, points: 42 },
      { userId: jordan._id, type: 'strength', durationMinutes: 25, points: 30 },
    ]);
    await Workout.create([
      { title: 'Easy interval run', type: 'running', difficulty: 'beginner', durationMinutes: 25, description: 'Alternate a light jog with short walks.' },
      { title: 'Full-body basics', type: 'strength', difficulty: 'beginner', durationMinutes: 20, description: 'Build a foundation with bodyweight movements.' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
