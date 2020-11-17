import gql from 'graphql-tag';

const profileBasicUpdate = gql`mutation profileBasicUpdate(
  $firstName: String!
  $lastName: String!
) {
  profileBasicUpdate(firstName: $firstName, lastName: $lastName) {
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

export default profileBasicUpdate;
