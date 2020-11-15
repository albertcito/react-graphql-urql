import gql from 'graphql-tag';

const langsQuery = gql`query langs {
  langs {
    langID
    name
    localName
  }
}`;

export default langsQuery;
