import { gql } from '@apollo/client';

const profileEmailUpdate = gql`mutation profileUpdateEmail(
  $email: String!
  $password: String!
) {
  profileUpdateEmail(email: $email, password: $password) {
    userID
    firstName
    lastName
    email
  }
}`;

export default profileEmailUpdate;
