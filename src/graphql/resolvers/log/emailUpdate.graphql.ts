import gql from 'graphql-tag';

const userStatusReasonsQuery = gql`query emailUpdates(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  emailUpdates(
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
      emailNew
      emailOld
      createdAt
      createdBy
    }
  }
}`;

export default userStatusReasonsQuery;
