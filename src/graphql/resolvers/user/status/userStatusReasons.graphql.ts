import gql from 'graphql-tag';

const userStatusReasonsQuery = gql`query userStatusReasons(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  userStatusReasons(
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
      userStatusID
      reason
      createdAt
      createdBy
    }
  }
}`;

export default userStatusReasonsQuery;
