import gql from 'graphql-tag';

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
