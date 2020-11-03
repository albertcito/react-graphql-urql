import React from 'react';
import { Alert } from 'antd';
import { CombinedError } from '@urql/core';

export interface AlertErrorProperties {
  error: CombinedError;
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
