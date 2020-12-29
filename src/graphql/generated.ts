import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
};

export type VText = {
  __typename?: 'VText';
  id: Scalars['String'];
  text: Scalars['String'];
  langID: Scalars['String'];
  translationID: Scalars['Int'];
  /** Language name */
  name: Scalars['String'];
  /** If the current text exist in this language */
  isAvailable: Scalars['Boolean'];
  /** If the text does not exist it will be replaced by the text of this language */
  originalLangID: Scalars['String'];
  /** Lang table value */
  active: Scalars['Boolean'];
  /** Translation status */
  isBlocked: Scalars['Boolean'];
  /** Translation code */
  code: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: RolesEnum;
  nameID: Scalars['Int'];
  descriptionID?: Maybe<Scalars['Int']>;
  names: Array<VText>;
  name: VText;
  descriptions?: Maybe<Array<VText>>;
  description?: Maybe<VText>;
};


export type RoleNameArgs = {
  langID?: Maybe<Scalars['String']>;
};


export type RoleDescriptionArgs = {
  langID?: Maybe<Scalars['String']>;
};

/** All possible roles */
export enum RolesEnum {
  SuperAdmin = 'superAdmin',
  Admin = 'admin'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  userStatusID: Scalars['String'];
  fullName: Scalars['String'];
  roles: Array<Role>;
};

export type OauthAccessToken = {
  __typename?: 'OauthAccessToken';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID: Scalars['Int'];
  revoked: Scalars['Boolean'];
  expiredAt: Scalars['Float'];
};

export type EmailRecipient = {
  __typename?: 'EmailRecipient';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  emailID: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  type: EmailRecipientTypeEnum;
};

/** Email recipients */
export enum EmailRecipientTypeEnum {
  To = 'to',
  Cc = 'cc',
  Bcc = 'bcc'
}

export type EmailLog = {
  __typename?: 'EmailLog';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID?: Maybe<Scalars['Int']>;
  from: Scalars['String'];
  fromName?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  content: Scalars['String'];
  replyTo?: Maybe<Scalars['String']>;
  replyToName?: Maybe<Scalars['String']>;
  sentAt: Scalars['Float'];
  recipients: Array<EmailRecipient>;
};

export type EmailUpdate = {
  __typename?: 'EmailUpdate';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID: Scalars['Int'];
  emailOld: Scalars['String'];
  emailNew: Scalars['String'];
};

export type Lang = {
  __typename?: 'Lang';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  name: Scalars['String'];
  localname: Scalars['String'];
  active: Scalars['Boolean'];
  isBlocked: Scalars['Boolean'];
};

export type PasswordUpdate = {
  __typename?: 'PasswordUpdate';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID: Scalars['Int'];
};

export type Text = {
  __typename?: 'Text';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  langID: Scalars['String'];
  translationID: Scalars['Int'];
};

export type Translation = {
  __typename?: 'Translation';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  code: Scalars['String'];
  isBlocked: Scalars['Boolean'];
  texts: Array<VText>;
  text: VText;
};


export type TranslationTextArgs = {
  langID?: Maybe<Scalars['String']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UserStatus = {
  __typename?: 'UserStatus';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: UserStatusEnum;
  nameID: Scalars['Int'];
  descriptionID?: Maybe<Scalars['Int']>;
  available: Scalars['Boolean'];
  names: Array<VText>;
  name: VText;
  descriptions?: Maybe<Array<VText>>;
  description?: Maybe<VText>;
};


export type UserStatusNameArgs = {
  langID?: Maybe<Scalars['String']>;
};


export type UserStatusDescriptionArgs = {
  langID?: Maybe<Scalars['String']>;
};

/** All possible user status */
export enum UserStatusEnum {
  Active = 'active',
  Disabled = 'disabled',
  Locked = 'locked'
}

export type UserStatusReason = {
  __typename?: 'UserStatusReason';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID: Scalars['Int'];
  userStatusID: UserStatusEnum;
  reason: Scalars['String'];
};

export type UserToken = {
  __typename?: 'UserToken';
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  createdBy?: Maybe<Scalars['Int']>;
  updatedBy?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  userID: Scalars['Int'];
  token: Scalars['String'];
  type: Scalars['String'];
  usedAt?: Maybe<Scalars['Float']>;
  expiredAt: Scalars['Float'];
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

export type EmailLogPaginationResponse = {
  __typename?: 'EmailLogPaginationResponse';
  data: Array<EmailLog>;
  pagination: Pagination;
};

export type PasswordUpdatePaginationResponse = {
  __typename?: 'PasswordUpdatePaginationResponse';
  data: Array<EmailUpdate>;
  pagination: Pagination;
};

export type EmailUpdatePaginationResponse = {
  __typename?: 'EmailUpdatePaginationResponse';
  data: Array<PasswordUpdate>;
  pagination: Pagination;
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

export type TranslationCreateResponse = {
  __typename?: 'TranslationCreateResponse';
  data: Translation;
  message: MessageField;
};

export type TranslationPaginationResponse = {
  __typename?: 'TranslationPaginationResponse';
  data: Array<Translation>;
  pagination: Pagination;
};

export type TranslationUpdateResponse = {
  __typename?: 'TranslationUpdateResponse';
  data: Translation;
  message: MessageField;
};

export type OauthAccessTokenPaginationResponse = {
  __typename?: 'OauthAccessTokenPaginationResponse';
  data: Array<OauthAccessToken>;
  pagination: Pagination;
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

export type UserStatusReasonPaginationResponse = {
  __typename?: 'UserStatusReasonPaginationResponse';
  data: Array<UserStatusReason>;
  pagination: Pagination;
};

export type UserTokenPaginationResponse = {
  __typename?: 'UserTokenPaginationResponse';
  data: Array<UserToken>;
  pagination: Pagination;
};

export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  data: Array<User>;
  pagination: Pagination;
};

export type TextInputCreate = {
  text: Scalars['String'];
  langID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  lang: Lang;
  langs: LangPaginationResponse;
  emailLogs: EmailLogPaginationResponse;
  emailUpdates: PasswordUpdatePaginationResponse;
  passwordUpdates: EmailUpdatePaginationResponse;
  role: Role;
  roles: RolePaginationResponse;
  translation: Translation;
  translations: TranslationPaginationResponse;
  userAuthAccess: OauthAccessTokenPaginationResponse;
  userStatuses: Array<UserStatus>;
  userStatusReasons: UserStatusReasonPaginationResponse;
  userTokens: UserTokenPaginationResponse;
  user: User;
  users: UserPaginationResponse;
};


export type QueryLangArgs = {
  id: Scalars['String'];
};


export type QueryLangsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryEmailLogsArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryEmailUpdatesArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryPasswordUpdatesArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryRoleArgs = {
  id: RolesEnum;
};


export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryTranslationArgs = {
  id: Scalars['Int'];
};


export type QueryTranslationsArgs = {
  langID?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryUserAuthAccessArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryUserStatusReasonsArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryUserTokensArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userID: Scalars['Int'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>;
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
  translationCreate: TranslationCreateResponse;
  translationDelete: MessageField;
  translationUpdate: TranslationUpdateResponse;
  userRolesUpdate: MessageField;
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
  /** Update user status. If it is inactive revoked all oAuth token */
  userStatusUpdate: MessageField;
};


export type MutationLangCreateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  localname: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['String'];
};


export type MutationLangDeleteArgs = {
  id: Scalars['String'];
};


export type MutationLangUpdateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  localname: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRoleDeleteArgs = {
  id: RolesEnum;
};


export type MutationRoleUpdateArgs = {
  descriptionID: Scalars['Int'];
  nameID: Scalars['Int'];
  id: RolesEnum;
};


export type MutationTranslationCreateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  texts: Array<TextInputCreate>;
};


export type MutationTranslationDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationTranslationUpdateArgs = {
  isBlocked?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  texts: Array<TextInputCreate>;
  id: Scalars['Int'];
};


export type MutationUserRolesUpdateArgs = {
  userID: Scalars['Int'];
  rolesID: Array<Scalars['String']>;
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
  id: Scalars['Int'];
};


export type MutationUserUpdateEmailArgs = {
  email: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUserUpdatePasswordArgs = {
  password: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUserStatusUpdateArgs = {
  userID: Scalars['Int'];
  reason: Scalars['String'];
  userStatusID: Scalars['String'];
};

export type LangsQueryVariables = Exact<{ [key: string]: never; }>;


export type LangsQuery = (
  { __typename?: 'Query' }
  & { langs: (
    { __typename?: 'LangPaginationResponse' }
    & { data: Array<(
      { __typename?: 'Lang' }
      & Pick<Lang, 'id' | 'localname' | 'name'>
    )> }
  ) }
);

export type EmailLogsQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type EmailLogsQuery = (
  { __typename?: 'Query' }
  & { emailLogs: (
    { __typename?: 'EmailLogPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'EmailLog' }
      & Pick<EmailLog, 'id' | 'userID' | 'sentAt' | 'subject' | 'fromName' | 'from' | 'createdAt' | 'createdBy'>
    )> }
  ) }
);

export type EmailUpdatesQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type EmailUpdatesQuery = (
  { __typename?: 'Query' }
  & { emailUpdates: (
    { __typename?: 'PasswordUpdatePaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'EmailUpdate' }
      & Pick<EmailUpdate, 'id' | 'userID' | 'emailNew' | 'emailOld' | 'createdAt' | 'createdBy'>
    )> }
  ) }
);

export type PasswordUpdatesQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type PasswordUpdatesQuery = (
  { __typename?: 'Query' }
  & { passwordUpdates: (
    { __typename?: 'EmailUpdatePaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'PasswordUpdate' }
      & Pick<PasswordUpdate, 'id' | 'userID' | 'createdAt' | 'createdBy'>
    )> }
  ) }
);

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles: (
    { __typename?: 'RolePaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'nameID' | 'descriptionID'>
      & { name: (
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'text'>
      ), description?: Maybe<(
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'text'>
      )> }
    )> }
  ) }
);

export type TranslationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TranslationQuery = (
  { __typename?: 'Query' }
  & { translation: (
    { __typename?: 'Translation' }
    & Pick<Translation, 'id' | 'code' | 'isBlocked'>
    & { texts: Array<(
      { __typename?: 'VText' }
      & Pick<VText, 'id' | 'text' | 'langID' | 'originalLangID'>
    )> }
  ) }
);

export type TranslationCreateMutationVariables = Exact<{
  texts: Array<TextInputCreate>;
}>;


export type TranslationCreateMutation = (
  { __typename?: 'Mutation' }
  & { translationCreate: (
    { __typename?: 'TranslationCreateResponse' }
    & { data: (
      { __typename?: 'Translation' }
      & Pick<Translation, 'id' | 'code'>
      & { texts: Array<(
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'text' | 'langID'>
      )> }
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type TranslationDeleteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TranslationDeleteMutation = (
  { __typename?: 'Mutation' }
  & { translationDelete: (
    { __typename?: 'MessageField' }
    & Pick<MessageField, 'message' | 'type'>
  ) }
);

export type TranslationUpdateMutationVariables = Exact<{
  id: Scalars['Int'];
  texts: Array<TextInputCreate>;
  code?: Maybe<Scalars['String']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
}>;


export type TranslationUpdateMutation = (
  { __typename?: 'Mutation' }
  & { translationUpdate: (
    { __typename?: 'TranslationUpdateResponse' }
    & { data: (
      { __typename?: 'Translation' }
      & Pick<Translation, 'id' | 'code'>
      & { texts: Array<(
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'text' | 'langID'>
      )> }
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type TranslationsQueryVariables = Exact<{
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  langID?: Maybe<Scalars['String']>;
}>;


export type TranslationsQuery = (
  { __typename?: 'Query' }
  & { translations: (
    { __typename?: 'TranslationPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'Translation' }
      & Pick<Translation, 'id' | 'code'>
      & { texts: Array<(
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'langID' | 'originalLangID'>
      )>, text: (
        { __typename?: 'VText' }
        & Pick<VText, 'id' | 'text' | 'langID' | 'originalLangID'>
      ) }
    )> }
  ) }
);

export type UserAuthAccessQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type UserAuthAccessQuery = (
  { __typename?: 'Query' }
  & { userAuthAccess: (
    { __typename?: 'OauthAccessTokenPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'OauthAccessToken' }
      & Pick<OauthAccessToken, 'id' | 'revoked' | 'expiredAt' | 'createdAt' | 'createdBy'>
    )> }
  ) }
);

export type UserRolesUpdateMutationVariables = Exact<{
  userID: Scalars['Int'];
  rolesID: Array<Scalars['String']>;
}>;


export type UserRolesUpdateMutation = (
  { __typename?: 'Mutation' }
  & { userRolesUpdate: (
    { __typename?: 'MessageField' }
    & Pick<MessageField, 'message' | 'type'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type ResetPasswordMutationVariables = Exact<{
  password_confirmation: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type LoggedUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LoggedUserMutation = (
  { __typename?: 'Mutation' }
  & { loggedUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'fullName' | 'emailVerified'>
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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'email' | 'createdAt' | 'updatedAt' | 'emailVerified'>
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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserBasicUpdateMutationVariables = Exact<{
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UserBasicUpdateMutation = (
  { __typename?: 'Mutation' }
  & { userBasicUpdate: (
    { __typename?: 'UserBasicUpdateResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserUpdateEmailMutationVariables = Exact<{
  id: Scalars['Int'];
  email: Scalars['String'];
}>;


export type UserUpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & { userUpdateEmail: (
    { __typename?: 'UserUpdateEmailResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserUpdatePasswordMutationVariables = Exact<{
  id: Scalars['Int'];
  password: Scalars['String'];
}>;


export type UserUpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { userUpdatePassword: (
    { __typename?: 'UserUpdatePasswordResponse' }
    & { data: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), message: (
      { __typename?: 'MessageField' }
      & Pick<MessageField, 'type' | 'message'>
    ) }
  ) }
);

export type UserStatusReasonsQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type UserStatusReasonsQuery = (
  { __typename?: 'Query' }
  & { userStatusReasons: (
    { __typename?: 'UserStatusReasonPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'UserStatusReason' }
      & Pick<UserStatusReason, 'id' | 'userID' | 'userStatusID' | 'reason' | 'createdAt' | 'createdBy'>
    )> }
  ) }
);

export type UserStatusUpdateMutationVariables = Exact<{
  userID: Scalars['Int'];
  userStatusID: Scalars['String'];
  reason: Scalars['String'];
}>;


export type UserStatusUpdateMutation = (
  { __typename?: 'Mutation' }
  & { userStatusUpdate: (
    { __typename?: 'MessageField' }
    & Pick<MessageField, 'message' | 'type'>
  ) }
);

export type UserStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserStatusesQuery = (
  { __typename?: 'Query' }
  & { userStatuses: Array<(
    { __typename?: 'UserStatus' }
    & Pick<UserStatus, 'id' | 'createdAt' | 'createdBy'>
    & { name: (
      { __typename?: 'VText' }
      & Pick<VText, 'id' | 'text'>
    ) }
  )> }
);

export type UserTokensQueryVariables = Exact<{
  userID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
}>;


export type UserTokensQuery = (
  { __typename?: 'Query' }
  & { userTokens: (
    { __typename?: 'UserTokenPaginationResponse' }
    & { pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'from' | 'to' | 'total' | 'limit' | 'page' | 'length'>
    ), data: Array<(
      { __typename?: 'UserToken' }
      & Pick<UserToken, 'id' | 'type' | 'expiredAt' | 'usedAt' | 'createdAt'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'fullName' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'userStatusID'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id'>
    )> }
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
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'fullName' | 'userStatusID'>
    )> }
  ) }
);


export const LangsDocument = gql`
    query langs {
  langs {
    data {
      id
      localname
      name
    }
  }
}
    `;

export function useLangsQuery(options: Omit<Urql.UseQueryArgs<LangsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LangsQuery>({ query: LangsDocument, ...options });
};
export const EmailLogsDocument = gql`
    query emailLogs($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  emailLogs(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      userID
      sentAt
      subject
      fromName
      from
      createdAt
      createdBy
    }
  }
}
    `;

export function useEmailLogsQuery(options: Omit<Urql.UseQueryArgs<EmailLogsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmailLogsQuery>({ query: EmailLogsDocument, ...options });
};
export const EmailUpdatesDocument = gql`
    query emailUpdates($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  emailUpdates(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      userID
      emailNew
      emailOld
      createdAt
      createdBy
    }
  }
}
    `;

export function useEmailUpdatesQuery(options: Omit<Urql.UseQueryArgs<EmailUpdatesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EmailUpdatesQuery>({ query: EmailUpdatesDocument, ...options });
};
export const PasswordUpdatesDocument = gql`
    query passwordUpdates($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  passwordUpdates(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      userID
      createdAt
      createdBy
    }
  }
}
    `;

export function usePasswordUpdatesQuery(options: Omit<Urql.UseQueryArgs<PasswordUpdatesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PasswordUpdatesQuery>({ query: PasswordUpdatesDocument, ...options });
};
export const RolesDocument = gql`
    query roles {
  roles {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      id
      nameID
      name {
        id
        text
      }
      description {
        id
        text
      }
      descriptionID
    }
  }
}
    `;

export function useRolesQuery(options: Omit<Urql.UseQueryArgs<RolesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RolesQuery>({ query: RolesDocument, ...options });
};
export const TranslationDocument = gql`
    query translation($id: Int!) {
  translation(id: $id) {
    id
    code
    isBlocked
    texts {
      id
      text
      langID
      originalLangID
    }
  }
}
    `;

export function useTranslationQuery(options: Omit<Urql.UseQueryArgs<TranslationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TranslationQuery>({ query: TranslationDocument, ...options });
};
export const TranslationCreateDocument = gql`
    mutation translationCreate($texts: [TextInputCreate!]!) {
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
}
    `;

export function useTranslationCreateMutation() {
  return Urql.useMutation<TranslationCreateMutation, TranslationCreateMutationVariables>(TranslationCreateDocument);
};
export const TranslationDeleteDocument = gql`
    mutation translationDelete($id: Int!) {
  translationDelete(id: $id) {
    message
    type
  }
}
    `;

export function useTranslationDeleteMutation() {
  return Urql.useMutation<TranslationDeleteMutation, TranslationDeleteMutationVariables>(TranslationDeleteDocument);
};
export const TranslationUpdateDocument = gql`
    mutation translationUpdate($id: Int!, $texts: [TextInputCreate!]!, $code: String, $isBlocked: Boolean) {
  translationUpdate(id: $id, texts: $texts, code: $code, isBlocked: $isBlocked) {
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
}
    `;

export function useTranslationUpdateMutation() {
  return Urql.useMutation<TranslationUpdateMutation, TranslationUpdateMutationVariables>(TranslationUpdateDocument);
};
export const TranslationsDocument = gql`
    query translations($order: String, $orderBy: String, $search: String, $limit: Int, $page: Int, $langID: String) {
  translations(
    order: $order
    orderBy: $orderBy
    search: $search
    limit: $limit
    page: $page
    langID: $langID
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
      id
      code
      texts {
        id
        langID
        originalLangID
      }
      text(langID: $langID) {
        id
        text
        langID
        originalLangID
      }
    }
  }
}
    `;

export function useTranslationsQuery(options: Omit<Urql.UseQueryArgs<TranslationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TranslationsQuery>({ query: TranslationsDocument, ...options });
};
export const UserAuthAccessDocument = gql`
    query userAuthAccess($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  userAuthAccess(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      revoked
      expiredAt
      createdAt
      createdBy
    }
  }
}
    `;

export function useUserAuthAccessQuery(options: Omit<Urql.UseQueryArgs<UserAuthAccessQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserAuthAccessQuery>({ query: UserAuthAccessDocument, ...options });
};
export const UserRolesUpdateDocument = gql`
    mutation userRolesUpdate($userID: Int!, $rolesID: [String!]!) {
  userRolesUpdate(userID: $userID, rolesID: $rolesID) {
    message
    type
  }
}
    `;

export function useUserRolesUpdateMutation() {
  return Urql.useMutation<UserRolesUpdateMutation, UserRolesUpdateMutationVariables>(UserRolesUpdateDocument);
};
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ResetPasswordDocument = gql`
    mutation resetPassword($password_confirmation: String!, $password: String!, $token: String!) {
  resetPassword(
    password_confirmation: $password_confirmation
    password: $password
    token: $token
  )
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const LoggedUserDocument = gql`
    mutation loggedUser {
  loggedUser {
    id
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
      id
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
      id
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
      id
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
      id
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
    mutation userBasicUpdate($id: Int!, $firstName: String!, $lastName: String!) {
  userBasicUpdate(id: $id, lastName: $lastName, firstName: $firstName) {
    data {
      id
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
    mutation userUpdateEmail($id: Int!, $email: String!) {
  userUpdateEmail(id: $id, email: $email) {
    data {
      id
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
    mutation userUpdatePassword($id: Int!, $password: String!) {
  userUpdatePassword(id: $id, password: $password) {
    data {
      id
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
export const UserStatusReasonsDocument = gql`
    query userStatusReasons($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  userStatusReasons(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      userID
      userStatusID
      reason
      createdAt
      createdBy
    }
  }
}
    `;

export function useUserStatusReasonsQuery(options: Omit<Urql.UseQueryArgs<UserStatusReasonsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserStatusReasonsQuery>({ query: UserStatusReasonsDocument, ...options });
};
export const UserStatusUpdateDocument = gql`
    mutation userStatusUpdate($userID: Int!, $userStatusID: String!, $reason: String!) {
  userStatusUpdate(userID: $userID, userStatusID: $userStatusID, reason: $reason) {
    message
    type
  }
}
    `;

export function useUserStatusUpdateMutation() {
  return Urql.useMutation<UserStatusUpdateMutation, UserStatusUpdateMutationVariables>(UserStatusUpdateDocument);
};
export const UserStatusesDocument = gql`
    query userStatuses {
  userStatuses {
    id
    name {
      id
      text
    }
    createdAt
    createdBy
  }
}
    `;

export function useUserStatusesQuery(options: Omit<Urql.UseQueryArgs<UserStatusesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserStatusesQuery>({ query: UserStatusesDocument, ...options });
};
export const UserTokensDocument = gql`
    query userTokens($userID: Int!, $limit: Int, $page: Int, $orderBy: String, $order: String) {
  userTokens(
    userID: $userID
    limit: $limit
    page: $page
    orderBy: $orderBy
    order: $order
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
      id
      type
      expiredAt
      usedAt
      createdAt
    }
  }
}
    `;

export function useUserTokensQuery(options: Omit<Urql.UseQueryArgs<UserTokensQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserTokensQuery>({ query: UserTokensDocument, ...options });
};
export const UserDocument = gql`
    query user($id: Int!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    fullName
    createdAt
    updatedAt
    emailVerified
    userStatusID
    roles {
      id
    }
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
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
      emailVerified
      fullName
      userStatusID
    }
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};