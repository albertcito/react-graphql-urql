import gql from 'graphql-tag';

const userTokens = gql`query userTokens(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  userTokens(
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
      type
      expiredAt
      usedAt
      createdAt
    }
  }
}`;

export default userTokens;
