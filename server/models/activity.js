const mongoose = require('mongoose');

// Define schema for Activity
const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  type: {
    type: String,
    enum: ['run', 'bike', 'swim', 'walk'],
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  time: {
    type: Number, // Assuming time is in minutes
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create and export Activity model
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;