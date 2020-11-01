import React from 'react';
import { InboxOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin } from 'antd';

import { useProfileUpdateEmailMutation } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';

interface OnFinishArguments {
  email: string;
  password: string;
}

const EmailForm: React.FC = () => {
  const [updateEmail, { loading, error }] = useProfileUpdateEmailMutation({
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) {
        const { message, type } = data.profileUpdateEmail.message;
        notification[type]({ message });
      }
    },
  });

  return (
    <Spin spinning={loading}>
      {error && <AlertError error={error} />}
      <Form
        initialValues={{ email: 'me@albertcito.com' }}
        onFinish={(variables: OnFinishArguments) => updateEmail({ variables })}
      >
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
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
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
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default EmailForm;
