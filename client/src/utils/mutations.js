import { gql } from '@apollo/client';

// Mutation to create a new user
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!) {
    createUser(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

// Mutation to create a new activity
export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($userId: ID!, $name: String!) {
    createActivity(userId: $userId, name: $name) {
      id
      name
    }
  }
`;

// Mutation to create a new goal
export const CREATE_GOAL = gql`
  mutation CreateGoal($userId: ID!, $target: String!) {
    createGoal(userId: $userId, target: $target) {
      id
      target
    }
  }
`;