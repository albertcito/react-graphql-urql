import gql from 'graphql-tag';

const translationCreate = gql`mutation translationCreate($texts: [TextInputCreate!]!){
  translationCreate(texts: $texts) {
    data {
      id
      code
      texts {
        id
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
