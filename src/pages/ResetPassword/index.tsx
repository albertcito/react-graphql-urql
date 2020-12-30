import React from 'react';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import PageProperties from 'routes/PageProperties';
import { useResetPasswordMutation } from 'graphql/generated';
import { ResetPasswordForm } from './Form';
import { Error404 } from 'templates/errors';

const { Title, Paragraph } = Typography;

const ResetPassword: React.FC<PageProperties> = () => {
  const { search } = useLocation();
  const { token } = queryString.parse(search);
  useWindowTitle('Forgot Password');
  const [{ fetching, error, data }, send] = useResetPasswordMutation();

  if (typeof token !== 'string') {
    return <Error404 />;
  }

  return (
    <div>
      <Title>
        ForgotPassword
      </Title>
      {(data && data.resetPassword)
        ? <Paragraph>{data.resetPassword}</Paragraph>
        : (
          <ResetPasswordForm
            fetching={fetching}
            error={error}
            onFinish={(values) => send({
              password_confirmation: values.confirmPassword,
              password: values.password,
              token,
            })}
          />
        )}
    </div>
  );
};

export default ResetPassword;
