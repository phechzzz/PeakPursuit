
const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activities: [Activity]
    goals: [Goal]
  }

  type Activity {
    _id: ID!
    name: String!
    user: User!
  }

  type Goal {
    _id: ID!
    target: String!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getActivities(userId: ID!): [Activity]
    getGoals(userId: ID!): [Goal]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    createActivity(userId: ID!, name: String!): Activity
    createGoal(userId: ID!, target: String!): Goal
  }
`;

module.exports = typeDefs;

