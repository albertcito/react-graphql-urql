import { InboxOutlined, LockOutlined } from '@ant-design/icons';
import { ApolloError } from '@apollo/client';
import { Button, Form, Input, Spin, notification } from 'antd';
import React from 'react';

import AlertError from 'ui/Alert/AlertError';

const onClick = () => notification.info({
  message: 'To be implemented',
  description: 'This feature will be implemented ASAP.',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type onLoginType = (email: string, password: string) => void;
interface LoginFormProperties {
  doLogin: onLoginType;
  loading: boolean;
  error?: ApolloError;
}

const LoginForm: React.FC<LoginFormProperties> = ({ doLogin, loading, error }) => {
  const onSubmit = ({ email, password }: {
    email: string;
    password: string;
  }) => {
    doLogin(email, password);
  };

  return (
    <Spin spinning={loading}>
      <div className='modal session-form'>
        <h2 className='modal-title'>
          Login
        </h2>
        {error && <AlertError error={error} />}
        <Form onFinish={onSubmit} initialValues={{ email: 'me@albertcito.com', password: '123456' }}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail',
              },
            ]}
            hasFeedback
          >
            <Input
              autoComplete='email'
              placeholder='Email'
              size='large'
              type='email'
              prefix={<InboxOutlined />}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your password',
            }]}
            hasFeedback
          >
            <Input.Password
              autoComplete='password'
              size='large'
              placeholder='Password'
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='session-form-button'
            >
              Submit
            </Button>
            <Button type='link' className='login-form-forgot' onClick={onClick}>
              Forgot Password
            </Button>
          </Form.Item>
        </Form>
        <p className='session-form-already'>
          Don&#39;t have an account?
          {' '}
          <Button type='link' className='link-button' onClick={onClick}>
            <b>Singup</b>
          </Button>
        </p>
      </div>
    </Spin>
  );
};

export default LoginForm;
