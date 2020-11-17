import gql from 'graphql-tag';

const translationUpdate = gql`mutation translationUpdate(
  $id: Int!
  $texts: [TextInputCreate!]!
  $code: String
  $isBlocked: Boolean
) {
  translationUpdate(
    id: $id
    texts: $texts
    code: $code
    isBlocked: $isBlocked
  ) {
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

export default translationUpdate;
