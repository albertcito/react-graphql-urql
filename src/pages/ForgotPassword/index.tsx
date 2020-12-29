import React from 'react';
import { Typography } from 'antd';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import PageProperties from 'routes/PageProperties';
import { useForgotPasswordMutation } from 'graphql/generated';
import ForgotPasswordForm from './Form';

const { Title, Paragraph } = Typography;

const ForgotPassword: React.FC<PageProperties> = () => {
  useWindowTitle('Forgot Password');
  const [{ fetching, error, data }, send] = useForgotPasswordMutation();
  return (
    <div>
      <Title>
        ForgotPassword
      </Title>
      {(data && data.forgotPassword)
        ? <Paragraph>{data.forgotPassword}</Paragraph>
        : (
          <ForgotPasswordForm
            fetching={fetching}
            error={error}
            onFinish={send}
          />
        )}
    </div>
  );
};

export default ForgotPassword;
