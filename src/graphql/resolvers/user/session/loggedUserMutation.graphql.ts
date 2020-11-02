import { gql } from '@apollo/client';

const loggedUserMutation = gql`mutation loggedUser {
  loggedUser {
    userID
    email
    firstName
    lastName
    fullName
    emailVerified
  }
}`;

export default loggedUserMutation;
