import gql from 'graphql-tag';

const userUpdatePassword = gql`mutation userUpdatePassword($id: Int!, $password: String!) {
  userUpdatePassword(id: $id, password: $password) {
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

export default userUpdatePassword;
