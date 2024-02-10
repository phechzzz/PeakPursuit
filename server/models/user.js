const mongoose = require('mongoose');

// Define schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity' // Assuming there's an Activity model
    }
  ],
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal' // Assuming there's a Goal model
    }
  ]
});

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;
