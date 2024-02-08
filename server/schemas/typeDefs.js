
const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    activities: [Activity]!
    goals: [Goal]!
  }

  type Activity {
    id: ID!
    name: String!
    user: User!
  }

  type Goal {
    id: ID!
    target: String!
    user: User!
  }

  type Query {
    getUser(id: ID!): User
    getActivities(userId: ID!): [Activity]
    getGoals(userId: ID!): [Goal]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    createActivity(userId: ID!, name: String!): Activity
    createGoal(userId: ID!, target: String!): Goal
  }
`;

module.exports = typeDefs;

