import gql from 'graphql-tag';

const langsQuery = gql`
  query langs {
    langs {
      data{
        id
        localname
        name
      }
    }
  }
`;

export default langsQuery;
