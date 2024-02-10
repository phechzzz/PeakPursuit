import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to create a new user
export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {

    token
    user {
      _id
    }
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

