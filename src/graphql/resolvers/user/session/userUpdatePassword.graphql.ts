import gql from 'graphql-tag';

const userUpdatePassword = gql`mutation userUpdatePassword($userID: Int!, $password: String!) {
  userUpdatePassword(userID: $userID, password: $password) {
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

export default userUpdatePassword;
