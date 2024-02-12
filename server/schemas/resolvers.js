
const { User, Activity, Goal } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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

