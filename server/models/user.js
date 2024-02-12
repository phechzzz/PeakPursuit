const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema for User
const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Activity' // Assuming there's an Activity model
    }
  ],
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goal' // Assuming there's a Goal model
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create and export User model
const User = model('User', userSchema);

module.exports = User;

