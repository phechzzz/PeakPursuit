const { User, Activity, Goal } = require('../models');

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
  },
  Mutation: {
    createUser: async (_, { username, email }) => {
      try {
        const user = new User({ username, email });
        await user.save();
        return user;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    createActivity: async (_, { userId, name }) => {
      try {
        const activity = new Activity({ userId, name });
        await activity.save();
        return activity;
      } catch (error) {
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