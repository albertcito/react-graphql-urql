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
      id
      nameID
      name {
        id
        text
      }
      description {
        id
        text
      }
      descriptionID
    }
  }
}`;

export default rolesQuery;
