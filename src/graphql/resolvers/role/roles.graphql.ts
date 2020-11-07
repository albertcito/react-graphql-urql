import gql from 'graphql-tag';

const rolesQuery = gql`query roles {
  roles {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      roleID
      description
    }
  }
}`;

export default rolesQuery;
