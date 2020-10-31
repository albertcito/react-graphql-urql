import React from 'react';
import { Alert } from 'antd';
import { ApolloError } from '@apollo/client';

export interface AlertErrorProperties {
  error: ApolloError;
  mgBtm?: boolean;
}
const AlertError: React.FC<AlertErrorProperties> = ({ error, mgBtm }) => {
  const style = mgBtm ? { marginBottom: 20 } : undefined;
  return (
    <div style={style}>
      <Alert
        type='error'
        showIcon
        message={error.message}
      />
    </div>
  );
};

export default AlertError;
