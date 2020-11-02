import gql from 'graphql-tag';

const userBasicUpdate = gql`mutation userBasicUpdate($userID: Int!, $firstName: String!, $lastName: String!) {
  userBasicUpdate(userID: $userID, lastName: $lastName, firstName: $firstName) {
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

export default userBasicUpdate;
