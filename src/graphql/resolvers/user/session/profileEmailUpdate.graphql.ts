import { gql } from '@apollo/client';

const profileEmailUpdate = gql`mutation profileUpdateEmail(
  $email: String!
  $password: String!
) {
  profileUpdateEmail(email: $email, password: $password) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}`;

export default profileEmailUpdate;
