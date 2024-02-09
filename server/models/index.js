const mongoose = require('mongoose');

// Import models
const User = require('./user'); 
const Activity = require('./activity');
const Goal = require('./goal');

// Export all models
module.exports = {
  User,
  Activity,
  Goal
};
