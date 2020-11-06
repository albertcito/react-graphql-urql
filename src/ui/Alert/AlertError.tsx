import React from 'react';
import { Alert } from 'antd';
import { CombinedError } from '@urql/core';

export interface AlertErrorProperties {
  error: CombinedError;
}

interface ValidationErrors {
  code: string;
  errors: { [field: string]: string[]};
}

export const getErrors = (error: CombinedError) => {
  if (
    error.graphQLErrors
    && error.graphQLErrors[0]
    && error.graphQLErrors[0].extensions
    && error.graphQLErrors[0].extensions.error
  ) {
    const extensionError = error.graphQLErrors[0].extensions.error;
    if (extensionError.code === 'ValidatorError') {
      const validationErrors = extensionError as ValidationErrors;
      const html = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, errors] of Object.entries(validationErrors.errors)) {
        const htmlErrors: React.ReactNode[] = [];
        errors.forEach((value) => {
          htmlErrors.push(<span className='validation-error'>{value}</span>);
        });
        html.push(
          <div>
            <span className='validation-error-key'>{key}</span>
            :
            {' '}
            <span className='validation-error-list'>{htmlErrors}</span>
          </div>,
        );
      }
      return html;
    }

    if (extensionError.code === 'MessageError') {
      return (
        <div className='message-error'>{error.message}</div>
      );
    }
  }

  return <>{error.message}</>;
};

const AlertError: React.FC<AlertErrorProperties> = ({ error }) => (
  <div>
    <Alert
      type='error'
      showIcon
      message={getErrors(error)}
      style={{ marginBottom: 20 }}
    />
  </div>
);

export default AlertError;
