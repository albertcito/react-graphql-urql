import gql from 'graphql-tag';

const loggedUserMutation = gql`mutation loggedUser {
  loggedUser {
    id
    email
    firstName
    lastName
    fullName
    emailVerified
  }
}`;

export default loggedUserMutation;
