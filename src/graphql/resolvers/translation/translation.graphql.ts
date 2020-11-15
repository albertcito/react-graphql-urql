import gql from 'graphql-tag';

const translationsQuery = gql`query translation($translationID: Int!) {
  translation(translationID: $translationID) {
    translationID
    code
    isBlocked
    texts {
      text
      langID
      originalLangID
    }
  }
}`;

export default translationsQuery;
