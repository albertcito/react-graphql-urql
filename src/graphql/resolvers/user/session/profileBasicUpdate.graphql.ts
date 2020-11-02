import { gql } from '@apollo/client';

const profileBasicUpdate = gql`mutation profileBasicUpdate(
  $firstName: String!
  $lastName: String!
) {
  profileBasicUpdate(firstName: $firstName, lastName: $lastName) {
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

export default profileBasicUpdate;
