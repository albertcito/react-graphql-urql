import gql from 'graphql-tag';

const userStatuses = gql`query userStatuses {
  userStatuses {
    id
    name {
      id
      text
    }
    createdAt
    createdBy
  }
}`;

export default userStatuses;
