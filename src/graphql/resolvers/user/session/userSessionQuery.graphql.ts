import { gql } from '@apollo/client';

const userSessionQuery = gql`query userSession($userID: Int!) {
  user(userID: $userID) {
    userID
    email
    firstName
    lastName
    fullName
    emailVerified
  }
}`;

export default userSessionQuery;
