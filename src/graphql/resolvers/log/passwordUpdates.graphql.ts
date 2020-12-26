import gql from 'graphql-tag';

const passwordUpdates = gql`query passwordUpdates(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  passwordUpdates(
    userID: $userID,
    limit: $limit,
    page: $page,
    orderBy: $orderBy,
    order: $order
  ) {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      id
      userID
      createdAt
      createdBy
    }
  }
}`;

export default passwordUpdates;
