import gql from 'graphql-tag';

const usersQuery = gql`query users($limit: Int, $page: Int, $orderBy: String, $order: String, $search: String) {
  users(limit: $limit, page: $page, orderBy: $orderBy, order: $order, search: $search) {
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
      firstName
      lastName
      email
      createdAt
      updatedAt
      emailVerified
      fullName
      userStatusID
    }
  }
}`;

export default usersQuery;
