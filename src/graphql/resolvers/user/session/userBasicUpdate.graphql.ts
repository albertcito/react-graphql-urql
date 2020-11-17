import gql from 'graphql-tag';

const userBasicUpdate = gql`mutation userBasicUpdate($id: Int!, $firstName: String!, $lastName: String!) {
  userBasicUpdate(id: $id, lastName: $lastName, firstName: $firstName) {
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

export default userBasicUpdate;
