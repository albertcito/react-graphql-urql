import gql from 'graphql-tag';

const userAuthAccess = gql`query userAuthAccess(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  userAuthAccess(
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
      revoked
      expiredAt
      createdAt
      createdBy
    }
  }
}`;

export default userAuthAccess;
