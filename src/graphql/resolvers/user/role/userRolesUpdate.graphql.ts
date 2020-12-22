import gql from 'graphql-tag';

const userRolesUpdate = gql`mutation userRolesUpdate($userID: Int!, $rolesID: [String!]!) {
  userRolesUpdate(userID: $userID, rolesID: $rolesID) {
    message
    type
  }
}`;

export default userRolesUpdate;
