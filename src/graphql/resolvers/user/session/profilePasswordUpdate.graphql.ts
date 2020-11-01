import { gql } from '@apollo/client';

const profileUpdatePassword = gql`mutation profileUpdatePassword($password: String!, $newPassword: String!) {
  profileUpdatePassword(newPassword: $newPassword, password: $password) {
    userID
    firstName
    lastName
    email
  }
}`;

export default profileUpdatePassword;
