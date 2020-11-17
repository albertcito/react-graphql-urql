import gql from 'graphql-tag';

const profileEmailUpdate = gql`mutation profileUpdateEmail(
  $email: String!
  $password: String!
) {
  profileUpdateEmail(email: $email, password: $password) {
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

export default profileEmailUpdate;
