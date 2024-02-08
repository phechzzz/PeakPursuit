
const mongoose = require('mongoose');

// Define mongoose schemas
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const ActivitySchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
  },
});

const GoalSchema = new mongoose.Schema({
  target: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
  },
});

// Define mongoose models
const User = mongoose.model('User', UserSchema);
const Activity = mongoose.model('Activity', ActivitySchema);
const Goal = mongoose.model('Goal', GoalSchema);

module.exports = {
  User,
  Activity,
  Goal,
};

