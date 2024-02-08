import { gql } from '@apollo/client';

// Query to fetch user data
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      activities {
        id
        name
      }
      goals {
        id
        target
      }
    }
  }
`;

// Query to fetch activities by user ID
export const GET_ACTIVITIES = gql`
  query GetActivities($userId: ID!) {
    getActivities(userId: $userId) {
      id
      name
    }
  }
`;

// Query to fetch goals by user ID
export const GET_GOALS = gql`
  query GetGoals($userId: ID!) {
    getGoals(userId: $userId) {
      id
      target
    }
  }
`;