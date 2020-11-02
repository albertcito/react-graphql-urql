import { gql } from '@apollo/client';

const loginQuery = gql`mutation login($email: String!, $password:String!) {
  login(email:$email, password:$password) {
    user {
      userID
      firstName
      lastName
      fullName
      email
      createdAt
      updatedAt
      emailVerified
    }
    token
  }
}`;

export default loginQuery;
