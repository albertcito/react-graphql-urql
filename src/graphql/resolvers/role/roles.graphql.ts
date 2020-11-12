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
      nameID
      name {
        text
      }
      description {
        text
      }
      descriptionID
    }
  }
}`;

export default rolesQuery;
