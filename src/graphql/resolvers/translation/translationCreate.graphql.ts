import gql from 'graphql-tag';

const translationCreate = gql`mutation translationCreate($texts: [TextInputCreate!]!){
  translationCreate(texts: $texts) {
    data {
      translationID
      code
      texts {
        text
        langID
      }
    }
    message {
      type
      message
    }
  }
}`;

export default translationCreate;
