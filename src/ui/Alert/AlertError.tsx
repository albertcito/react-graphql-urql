import React from 'react';
import { Alert } from 'antd';
import { ApolloError } from '@apollo/client';

export interface AlertErrorProperties {
  error: ApolloError;
}

const AlertError: React.FC<AlertErrorProperties> = ({ error }) => {
  return (
    <div>
      <Alert
        type='error'
        showIcon
        message={error.message}
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};

export default AlertError;
