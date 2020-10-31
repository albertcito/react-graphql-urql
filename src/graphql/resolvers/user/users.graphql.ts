import { gql } from '@apollo/client';

const usersQuery = gql`query users($limit: Int, $page: Int) {
  users(limit: $limit, page: $page) {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      userID
      firstName
      lastName
      email
      createdAt
      updatedAt
      emailVerified
      fullName
    }
  }
}`;

export default usersQuery;
