import gql from 'graphql-tag';

const profileUpdatePassword = gql`mutation profileUpdatePassword($password: String!, $newPassword: String!) {
  profileUpdatePassword(newPassword: $newPassword, password: $password) {
    data {
      id
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
