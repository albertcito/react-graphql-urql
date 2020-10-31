import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
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
  login: LoginResponse;
  /** Logout from current session */
  logout: Scalars['String'];
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


export type QueryLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type QueryUserArgs = {
  userID?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  langCreate: Lang;
  langDelete: Scalars['String'];
  langUpdate: Lang;
  activateEmail: Scalars['String'];
  forgotPassword: Scalars['String'];
  resetPassword: Scalars['String'];
  signUp: User;
  userUpdate: User;
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


export type MutationActivateEmailArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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


export type MutationUserUpdateArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
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

export type LoginQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'userID' | 'firstName' | 'lastName' | 'fullName' | 'email' | 'createdAt' | 'updatedAt' | 'emailVerified'>
    ) }
  ) }
);

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'logout'>
);

export type UserSessionQueryVariables = Exact<{
  userID: Scalars['Int'];
}>;


export type UserSessionQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'userID' | 'email' | 'firstName' | 'lastName' | 'fullName' | 'emailVerified'>
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

/**
 * __useLangsQuery__
 *
 * To run a query within a React component, call `useLangsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLangsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLangsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLangsQuery(baseOptions?: Apollo.QueryHookOptions<LangsQuery, LangsQueryVariables>) {
        return Apollo.useQuery<LangsQuery, LangsQueryVariables>(LangsDocument, baseOptions);
      }
export function useLangsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LangsQuery, LangsQueryVariables>) {
          return Apollo.useLazyQuery<LangsQuery, LangsQueryVariables>(LangsDocument, baseOptions);
        }
export type LangsQueryHookResult = ReturnType<typeof useLangsQuery>;
export type LangsLazyQueryHookResult = ReturnType<typeof useLangsLazyQuery>;
export type LangsQueryResult = Apollo.QueryResult<LangsQuery, LangsQueryVariables>;
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

/**
 * __useLangsQueryPartialQuery__
 *
 * To run a query within a React component, call `useLangsQueryPartialQuery` and pass it any options that fit your needs.
 * When your component renders, `useLangsQueryPartialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLangsQueryPartialQuery({
 *   variables: {
 *   },
 * });
 */
export function useLangsQueryPartialQuery(baseOptions?: Apollo.QueryHookOptions<LangsQueryPartialQuery, LangsQueryPartialQueryVariables>) {
        return Apollo.useQuery<LangsQueryPartialQuery, LangsQueryPartialQueryVariables>(LangsQueryPartialDocument, baseOptions);
      }
export function useLangsQueryPartialLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LangsQueryPartialQuery, LangsQueryPartialQueryVariables>) {
          return Apollo.useLazyQuery<LangsQueryPartialQuery, LangsQueryPartialQueryVariables>(LangsQueryPartialDocument, baseOptions);
        }
export type LangsQueryPartialQueryHookResult = ReturnType<typeof useLangsQueryPartialQuery>;
export type LangsQueryPartialLazyQueryHookResult = ReturnType<typeof useLangsQueryPartialLazyQuery>;
export type LangsQueryPartialQueryResult = Apollo.QueryResult<LangsQueryPartialQuery, LangsQueryPartialQueryVariables>;
export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
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

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions?: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, baseOptions);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, baseOptions);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const UserSessionDocument = gql`
    query userSession($userID: Int!) {
  user(userID: $userID) {
    userID
    email
    firstName
    lastName
    fullName
    emailVerified
  }
}
    `;

/**
 * __useUserSessionQuery__
 *
 * To run a query within a React component, call `useUserSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSessionQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useUserSessionQuery(baseOptions?: Apollo.QueryHookOptions<UserSessionQuery, UserSessionQueryVariables>) {
        return Apollo.useQuery<UserSessionQuery, UserSessionQueryVariables>(UserSessionDocument, baseOptions);
      }
export function useUserSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSessionQuery, UserSessionQueryVariables>) {
          return Apollo.useLazyQuery<UserSessionQuery, UserSessionQueryVariables>(UserSessionDocument, baseOptions);
        }
export type UserSessionQueryHookResult = ReturnType<typeof useUserSessionQuery>;
export type UserSessionLazyQueryHookResult = ReturnType<typeof useUserSessionLazyQuery>;
export type UserSessionQueryResult = Apollo.QueryResult<UserSessionQuery, UserSessionQueryVariables>;
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users($limit: Int, $page: Int) {
  users(limit: $limit, page: $page) {
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

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;