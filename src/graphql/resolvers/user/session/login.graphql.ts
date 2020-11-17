import gql from 'graphql-tag';

const loginQuery = gql`mutation login($email: String!, $password:String!) {
  login(email:$email, password:$password) {
    user {
      id
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
