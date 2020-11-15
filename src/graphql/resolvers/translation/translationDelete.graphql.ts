import gql from 'graphql-tag';

const translationDelete = gql`mutation translationDelete($translationID: Int!){
  translationDelete(translationID:$translationID) {
    message
    type
  }
}`;

export default translationDelete;
