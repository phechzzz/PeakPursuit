import { gql } from '@apollo/client';

// Query to fetch user data
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      email
      activities {
        _id
      }
      goals {
        _id
        target
      }
    }
  }
`;



// Query to fetch activities by user ID
// export const GET_ACTIVITIES = gql`
//   query GetActivities($userId: ID!) {
//     getActivities(userId: $userId) {
//       _id
//       name
//     }
//   }
// `;

// // Query to fetch goals by user ID
// export const GET_GOALS = gql`
//   query GetGoals($userId: ID!) {
//     getGoals(userId: $userId) {
//       _id
//       target
//     }
//   }
// `;