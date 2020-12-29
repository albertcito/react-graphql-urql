import gql from 'graphql-tag';

export const forgotPassword = gql`mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}`;

export const resetPassword = gql`mutation resetPassword(
  $password_confirmation: String!
  $password: String!
  $token: String!
) {
  resetPassword(
    password_confirmation: $password_confirmation,
    password: $password,
    token: $token
  )
}`;
