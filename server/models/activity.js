const mongoose = require('mongoose');

// Define schema for Activity
const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['run', 'bike', 'swim', 'walk'],
    required: true
  },
  distance: {
    type: String,
    required: true,
    min: [0, 'Distance cannot be negative'],
  },
  time: {
    type: String, // Assuming time is in minutes
    required: true,
    min: [0, 'Time cannot be negative'],
  },
  
});

// Create and export the Activity model
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
