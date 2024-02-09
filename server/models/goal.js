const mongoose = require('mongoose');

// Define schema for Goal
const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Create and export Goal model
const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;