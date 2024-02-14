
const { User, Activity, Goal } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },
    getActivities: async (_, { userId }) => {
      try {
        return await Activity.find({ userId });
      } catch (error) {
        throw new Error('Failed to fetch activities');
      }
    },
    getGoals: async (_, { userId }) => {
      try {
        return await Goal.find({ userId });
      } catch (error) {
        throw new Error('Failed to fetch goals');
      }
    },
    getExercises: async (_, { muscle }) => {
      const apiKey = 'v9X8DLSBXiH/xYvpTnHuYA==jjbg4SH28sAAp638';
      const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    
      try {
        const response = await axios.get(url, {
          headers: { 'X-Api-Key': apiKey },
        });
        return response.data; // Axios automatically parses the JSON response
      } catch (error) {
        console.error('Request failed:', error);
        throw new Error('Failed to retrieve exercises');
      }
    },
  },
    
  
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        //await user.save();
        const token = signToken(user);
      return { token, user };
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      // const correctPw = await user.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw AuthenticationError;
      // }

      const token = signToken(user);

      return { token, user };
    },
    createActivity: async (_, args, context) => {
      try {
        // Ensure user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }
    
        // Extract input data
        const { type, distance, time } = args;
    
        // Create a new activity instance
        const activity = new Activity({
          user: context.user._id, // Assign the user ID from the context
          type,
          distance,
          time
        });
    
        // Save the activity to the database
        await activity.save();
    
        // Find the user in the database and update their activities array
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }
        user.activities.push(activity._id); // Assuming activities is an array of activity IDs
        await user.save();
    
        // Return the created activity
        return activity;
      } catch (error) {
        console.error('Failed to create activity:', error);
        throw new Error('Failed to create activity');
      }
    },
    createGoal: async (_, { userId, target }) => {
      try {
        const goal = new Goal({ userId, target });
        await goal.save();
        return goal;
      } catch (error) {
        throw new Error('Failed to create goal');
      }
    },
  },
  User: {
    activities: async (user) => {
      try {
        return await Activity.find({ userId: user.id });
      } catch (error) {
        throw new Error('Failed to fetch activities for user');
      }
    },
    goals: async (user) => {
      try {
        return await Goal.find({ userId: user.id });
      } catch (error) {
        throw new Error('Failed to fetch goals for user');
      }
    },
  },
};

module.exports = resolvers;

