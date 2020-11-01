import { gql } from '@apollo/client';

const profileUpdatePassword = gql`mutation profileUpdatePassword($password: String!, $newPassword: String!) {
  profileUpdatePassword(newPassword: $newPassword, password: $password) {
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

export default profileUpdatePassword;
