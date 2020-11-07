import gql from 'graphql-tag';

const userUpdateEmail = gql`mutation userUpdateEmail($userID: Int!, $email: String!) {
  userUpdateEmail(userID: $userID, email: $email) {
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

export default userUpdateEmail;
