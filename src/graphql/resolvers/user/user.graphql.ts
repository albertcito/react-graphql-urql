import gql from 'graphql-tag';

const userQuery = gql`query user($userID: Int!) {
  user(userID: $userID) {
    userID
    email
    firstName
    lastName
    fullName
    createdAt
    updatedAt
    emailVerified
  }
}`;

export default userQuery;
