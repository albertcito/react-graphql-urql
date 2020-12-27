import gql from 'graphql-tag';

const userStatusReasonsQuery = gql`query emailLogs(
  $userID: Int!,
  $limit: Int,
  $page: Int,
  $orderBy: String,
  $order: String,
) {
  emailLogs(
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
      sentAt
      subject
      fromName
      from
      createdAt
      createdBy
    }
  }
}`;

export default userStatusReasonsQuery;
