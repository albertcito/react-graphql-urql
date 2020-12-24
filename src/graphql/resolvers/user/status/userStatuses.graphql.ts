import gql from 'graphql-tag';

const userStatuses = gql`query userStatuses {
  userStatuses {
    id
    name { text }
    createdAt
    createdBy
  }
}`;

export default userStatuses;
