import gql from 'graphql-tag';

const userQuery = gql`query user($id: Int!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    fullName
    createdAt
    updatedAt
    emailVerified
    userStatusID
    roles {
      id
    }
  }
}`;

export default userQuery;
