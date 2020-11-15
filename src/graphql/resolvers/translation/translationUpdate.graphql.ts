import gql from 'graphql-tag';

const translationUpdate = gql`mutation translationUpdate(
  $translationID: Int!
  $texts: [TextInputCreate!]!
  $code: String
  $isBlocked: Boolean
) {
  translationUpdate(
    translationID: $translationID
    texts: $texts
    code: $code
    isBlocked: $isBlocked
  ) {
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

export default translationUpdate;
