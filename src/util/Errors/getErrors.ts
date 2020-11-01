import { ApolloError } from '@apollo/client';

// eslint-disable-next-line no-shadow
export enum ServerErrors {
  ValidatorError = 'ValidatorError',
  MessageError = 'MessageError',
}

export interface MessageError {
  message: string;
}

export interface ValidatorErrorMessage<T = unknown> extends MessageError {
  code: ServerErrors.ValidatorError;
  errors: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [key in keyof T]: string[];
  };
}

export function getErrors<T = unknown>(error: ApolloError): ValidatorErrorMessage<T> | MessageError {
  for (let i = 0; i < error.graphQLErrors.length; i += 1) {
    const graphQLError = error.graphQLErrors[i].extensions;
    if (graphQLError) {
      if (graphQLError.code === ServerErrors.ValidatorError) {
        return {
          message: error.message,
          ...graphQLError,
        };
      }
      if (graphQLError.code === ServerErrors.MessageError) {
        return { message: error.message };
      }
    }
  }
  return { message: error.message };
}

export function getValidationErrors<T>(error?: ApolloError) {
  if (error) {
    const errors = getErrors<T>(error);
    if (errors && 'code' in errors && errors.code === 'ValidatorError') {
      return errors;
    }
  }
  return null;
}
