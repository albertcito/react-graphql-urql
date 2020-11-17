import gql from 'graphql-tag';

const translationDelete = gql`mutation translationDelete($id: Int!){
  translationDelete(id:$id) {
    message
    type
  }
}`;

export default translationDelete;
