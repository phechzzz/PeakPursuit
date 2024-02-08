const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitness_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define mongoose models
const User = mongoose.model('User', {
  username: String,
  email: String,
});

const Activity = mongoose.model('Activity', {
  name: String,
  userId: mongoose.Schema.Types.ObjectId, // Reference to User
});

const Goal = mongoose.model('Goal', {
  target: String,
  userId: mongoose.Schema.Types.ObjectId, // Reference to User
});

// GraphQL types
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    activities: {
      type: GraphQLList(ActivityType),
      resolve: async (parent) => {
        return Activity.find({ userId: parent.id });
      },
    },
    goals: {
      type: GraphQLList(GoalType),
      resolve: async (parent) => {
        return Goal.find({ userId: parent.id });
      },
    },
  }),
});

const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const GoalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => ({
    id: { type: GraphQLID },
    target: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// GraphQL schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLNonNull(GraphQLID) } },
        resolve: async (_, { id }) => {
          return User.findById(id);
        },
      },
      // Add more queries as needed
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: UserType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, { username, email }) => {
          const user = new User({ username, email });
          return user.save();
        },
      },
      // Add more mutations as needed
    },
  }),
});

// Create Express app
const app = express();

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL for testing in browser
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});