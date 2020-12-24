import gql from 'graphql-tag';

const userStatusUpdate = gql`mutation userStatusUpdate($userID: Int!, $userStatusID: String!, $reason: String!) {
    userStatusUpdate(userID: $userID, userStatusID: $userStatusID, reason: $reason) {
      message
      type
    }
  }`;

export default userStatusUpdate;
