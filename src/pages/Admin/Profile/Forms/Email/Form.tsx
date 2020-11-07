import React from 'react';
import { InboxOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import AlertError from 'ui/Alert/AlertError';

export interface OnFinishArguments {
  email: string;
  password: string;
}

interface EmailFormProperties {
  email: string;
  onFinish: (values: OnFinishArguments) => void;
  error?: CombinedError;
  fetching: boolean;
}

export const EmailProfileForm: React.FC<EmailFormProperties> = ({
  email,
  onFinish,
  fetching,
  error,
}) => (
  <Spin spinning={fetching}>
    {error && <AlertError error={error} />}
    <Form
      initialValues={{ email }}
      onFinish={onFinish}
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
