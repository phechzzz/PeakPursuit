import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
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
  mutation createActivity($type: String!, $distance: String, $time: String, $user:String) {
    createActivity(type: $type, distance: $distance, time: $time, user: $user) {
      _id
      user{_id}
      type
      distance
      time
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

