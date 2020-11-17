import gql from 'graphql-tag';

const userUpdateEmail = gql`mutation userUpdateEmail($id: Int!, $email: String!) {
  userUpdateEmail(id: $id, email: $email) {
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

export default userUpdateEmail;
