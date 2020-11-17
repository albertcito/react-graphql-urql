import gql from 'graphql-tag';

const translationsQuery = gql`query translation($id: Int!) {
  translation(id: $id) {
    id
    code
    isBlocked
    texts {
      id
      text
      langID
      originalLangID
    }
  }
}`;

export default translationsQuery;
