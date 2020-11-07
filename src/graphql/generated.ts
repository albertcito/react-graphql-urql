import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BaseDataEntity = {
  __typename?: 'BaseDataEntity';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  roleID: Roles;
  description: Scalars['String'];
};

/** All possible roles */
export enum Roles {
  SuperAdmin = 'superAdmin',
  Admin = 'admin'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  fullName: Scalars['String'];
  roles: Array<Role>;
};

export type OauthAccessToken = {
  __typename?: 'OauthAccessToken';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  oauthAccessTokenID: Scalars['Int'];
  userID: Scalars['Int'];
  signature: Scalars['String'];
  token: Scalars['String'];
  revoked: Scalars['Boolean'];
};

export type Lang = {
  __typename?: 'Lang';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  langID: Scalars['String'];
  name: Scalars['String'];
  localname: Scalars['String'];
  active: Scalars['Boolean'];
  isBlocked: Scalars['Boolean'];
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  userRoleID: Scalars['Int'];
};

export type UserToken = {
  __typename?: 'UserToken';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  userTokenID: Scalars['Int'];
  userID: Scalars['Int'];
  token: Scalars['String'];
  type: Scalars['String'];
};

export type MessageField = {
  __typename?: 'MessageField';
  type: MessageType;
  message: Scalars['String'];
};

/** All possible message types */
export enum MessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export type LangCreateResponse = {
  __typename?: 'LangCreateResponse';
  data: Lang;
  message: MessageField;
};

export type Pagination = {
  __typename?: 'Pagination';
  length: Scalars['Int'];
  total: Scalars['Int'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type LangPaginationResponse = {
  __typename?: 'LangPaginationResponse';
  data: Array<Lang>;
  pagination: Pagination;
};

export type LangUpdateResponse = {
  __typename?: 'LangUpdateResponse';
  data: Lang;
  message: MessageField;
};

export type RolePaginationResponse = {
  __typename?: 'RolePaginationResponse';
  data: Array<Role>;
  pagination: Pagination;
};

export type RoleUpdateResponse = {
  __typename?: 'RoleUpdateResponse';
  data: Role;
  message: MessageField;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type ProfileBasicUpdateResponse = {
  __typename?: 'ProfileBasicUpdateResponse';
  data: User;
  message: MessageField;
};

export type ProfileUpdateEmailResponse = {
  __typename?: 'ProfileUpdateEmailResponse';
  data: User;
  message: MessageField;
};

export type ProfileUpdatePasswordResponse = {
  __typename?: 'ProfileUpdatePasswordResponse';
  data: User;
  message: MessageField;
};

export type UserBasicUpdateResponse = {
  __typename?: 'UserBasicUpdateResponse';
  data: User;
  message: MessageField;
};

export type UserUpdateEmailResponse = {
  __typename?: 'UserUpdateEmailResponse';
  data: User;
  message: MessageField;
};

export type UserUpdatePasswordResponse = {
  __typename?: 'UserUpdatePasswordResponse';
  data: User;
  message: MessageField;
};

export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  data: Array<User>;
  pagination: Pagination;
};

export type Query = {
  __typename?: 'Query';
  lang: Lang;
  langs: LangPaginationResponse;
  role: Role;
  roles: RolePaginationResponse;
  user: User;
  users: UserPaginationResponse;
};


export type QueryLangArgs = {
  langID: Scalars['String'];
};


export type QueryLangsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryRoleArgs = {
  roleID: Roles;
};


export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userID?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  langCreate: LangCreateResponse;
  langDelete: Scalars['String'];
  langUpdate: LangUpdateResponse;
  roleDelete: Scalars['String'];
  roleUpdate: RoleUpdateResponse;
  activateEmail: Scalars['String'];
  forgotPassword: Scalars['String'];
  loggedUser: User;
  login: LoginResponse;
  /** Logout from current session */
  logout: Scalars['String'];
  profileBasicUpdate: ProfileBasicUpdateResponse;
  profileUpdateEmail: ProfileUpdateEmailResponse;
  profileUpdatePassword: ProfileUpdatePasswordResponse;
  resetPassword: Scalars['String'];
  signUp: User;
  userBasicUpdate: UserBasicUpdateResponse;
  userUpdateEmail: UserUpdateEmailResponse;
  userUpdatePassword: UserUpdatePasswordResponse;
  userRoleCreate: Scalars['String'];
  userRoleDelete: Scalars['String'];
};


export type MutationLangCreateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  localname: Scalars['String'];
  name: Scalars['String'];
  langID: Scalars['String'];
};


export type MutationLangDeleteArgs = {
  langID: Scalars['String'];
};


export type MutationLangUpdateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  localname: Scalars['String'];
  name: Scalars['String'];
  langID: Scalars['String'];
};


export type MutationRoleDeleteArgs = {
  roleID: Roles;
};


export type MutationRoleUpdateArgs = {
  description: Scalars['String'];
  roleID: Roles;
};


export type MutationActivateEmailArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationProfileBasicUpdateArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationProfileUpdateEmailArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationProfileUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password_confirmation: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSignUpArgs = {
  password_confirmation: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationUserBasicUpdateArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  userID: Scalars['Int'];
};


export type MutationUserUpdateEmailArgs = {
  email: Scalars['String'];
  userID: Scalars['Int'];
};


export type MutationUserUpdatePasswordArgs = {
  password: Scalars['String'];
  userID: Scalars['Int'];
};


export type MutationUserRoleCreateArgs = {
  roleID: Roles;
  userID: Scalars['Int'];
};


export type MutationUserRoleDeleteArgs = {
  roleID: Roles;
  userID: Scalars['Int'];
};

export type LangsQueryVariables = Exact<{ [key: string]: never; }>;


export type LangsQuery = (
  { __typename?: 'Query' }
  & { langs: (
    { __typename?: 'LangPaginationResponse' }
    & { data: Array<(
      { __typename?: 'Lang' }
      & Pick<Lang, 'langID' | 'localname' | 'name'>
    )> }
  ) }
);

export type LangsQueryPartialQueryVariables = Exact<{ [key: string]: never; }>;


export type LangsQueryPartialQuery = (
  { __typename?: 'Query' }
  & { langs: (
    { __typename?: 'LangPaginationResponse' }
    & { data: Array<(
      { __typename?: 'Lang' }
      & Pick<Lang, 'langID' | 'name'>
    )> }
  ) }
);

export type LoggedUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LoggedUserMutation = (
  { __typename?: 'Mutation' }
  & { loggedUser: (
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'email' | 'firstName' | 'lastName' | 'fullName' | 'emailVerified'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'fullName' | 'email' | 'createdAt' | 'updatedAt' | 'emailVerified'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ProfileBasicUpdateMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type ProfileBasicUpdateMutation = (
  { __typename?: 'Mutation' }
  & { profileBasicUpdate: (
    { __typename?: 'ProfileBasicUpdateResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type ProfileUpdateEmailMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ProfileUpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & { profileUpdateEmail: (
    { __typename?: 'ProfileUpdateEmailResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type ProfileUpdatePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ProfileUpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { profileUpdatePassword: (
    { __typename?: 'ProfileUpdatePasswordResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserBasicUpdateMutationVariables = Exact<{
  userID: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UserBasicUpdateMutation = (
  { __typename?: 'Mutation' }
  & { userBasicUpdate: (
    { __typename?: 'UserBasicUpdateResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserUpdateEmailMutationVariables = Exact<{
  userID: Scalars['Int'];
  email: Scalars['String'];
}>;


export type UserUpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & { userUpdateEmail: (
    { __typename?: 'UserUpdateEmailResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserUpdatePasswordMutationVariables = Exact<{
  userID: Scalars['Int'];
  password: Scalars['String'];
}>;


export type UserUpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { userUpdatePassword: (
    { __typename?: 'UserUpdatePasswordResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserQueryVariables = Exact<{
  userID: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'email' | 'firstName' | 'lastName' | 'fullName' | 'createdAt' | 'updatedAt' | 'emailVerified'>
  ) }
);

export type UsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'email' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'fullName'>
    )> }
  ) }
);


export const LangsDocument = gql`
    query Langs {
  langs {
    data {
      langID
      localname
      name
    }
  }
}
    `;

export function useLangsQuery(options: Omit<Urql.UseQueryArgs<LangsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LangsQuery>({ query: LangsDocument, ...options });
};
export const LangsQueryPartialDocument = gql`
    query langsQueryPartial {
  langs {
    data {
      langID
      name
    }
  }
}
    `;

export function useLangsQueryPartialQuery(options: Omit<Urql.UseQueryArgs<LangsQueryPartialQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LangsQueryPartialQuery>({ query: LangsQueryPartialDocument, ...options });
};
export const LoggedUserDocument = gql`
    mutation loggedUser {
  loggedUser {
    userID
    email
    firstName
    lastName
    fullName
    emailVerified
  }
}
    `;

export function useLoggedUserMutation() {
  return Urql.useMutation<LoggedUserMutation, LoggedUserMutationVariables>(LoggedUserDocument);
};
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      userID
      firstName
      lastName
      fullName
      email
      createdAt
      updatedAt
      emailVerified
    }
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ProfileBasicUpdateDocument = gql`
    mutation profileBasicUpdate($firstName: String!, $lastName: String!) {
  profileBasicUpdate(firstName: $firstName, lastName: $lastName) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useProfileBasicUpdateMutation() {
  return Urql.useMutation<ProfileBasicUpdateMutation, ProfileBasicUpdateMutationVariables>(ProfileBasicUpdateDocument);
};
export const ProfileUpdateEmailDocument = gql`
    mutation profileUpdateEmail($email: String!, $password: String!) {
  profileUpdateEmail(email: $email, password: $password) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useProfileUpdateEmailMutation() {
  return Urql.useMutation<ProfileUpdateEmailMutation, ProfileUpdateEmailMutationVariables>(ProfileUpdateEmailDocument);
};
export const ProfileUpdatePasswordDocument = gql`
    mutation profileUpdatePassword($password: String!, $newPassword: String!) {
  profileUpdatePassword(newPassword: $newPassword, password: $password) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useProfileUpdatePasswordMutation() {
  return Urql.useMutation<ProfileUpdatePasswordMutation, ProfileUpdatePasswordMutationVariables>(ProfileUpdatePasswordDocument);
};
export const UserBasicUpdateDocument = gql`
    mutation userBasicUpdate($userID: Int!, $firstName: String!, $lastName: String!) {
  userBasicUpdate(userID: $userID, lastName: $lastName, firstName: $firstName) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useUserBasicUpdateMutation() {
  return Urql.useMutation<UserBasicUpdateMutation, UserBasicUpdateMutationVariables>(UserBasicUpdateDocument);
};
export const UserUpdateEmailDocument = gql`
    mutation userUpdateEmail($userID: Int!, $email: String!) {
  userUpdateEmail(userID: $userID, email: $email) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useUserUpdateEmailMutation() {
  return Urql.useMutation<UserUpdateEmailMutation, UserUpdateEmailMutationVariables>(UserUpdateEmailDocument);
};
export const UserUpdatePasswordDocument = gql`
    mutation userUpdatePassword($userID: Int!, $password: String!) {
  userUpdatePassword(userID: $userID, password: $password) {
    data {
      userID
      firstName
      lastName
      email
    }
    message {
      type
      message
    }
  }
}
    `;

export function useUserUpdatePasswordMutation() {
  return Urql.useMutation<UserUpdatePasswordMutation, UserUpdatePasswordMutationVariables>(UserUpdatePasswordDocument);
};
export const UserDocument = gql`
    query user($userID: Int!) {
  user(userID: $userID) {
    userID
    email
    firstName
    lastName
    fullName
    createdAt
    updatedAt
    emailVerified
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UsersDocument = gql`
    query users($limit: Int, $page: Int, $orderBy: String, $order: String, $search: String) {
  users(
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
    search: $search
  ) {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      userID
      firstName
      lastName
      email
      createdAt
      updatedAt
      emailVerified
      fullName
    }
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};