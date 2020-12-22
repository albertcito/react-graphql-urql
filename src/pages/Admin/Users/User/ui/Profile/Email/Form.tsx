import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import AlertError from 'ui/Alert/AlertError';

interface EmailUserFormProperties {
  email: string;
  onFinish: (email: string) => void;
  error?: CombinedError;
  fetching: boolean;
}

const EmailUserForm: React.FC<EmailUserFormProperties> = ({
  email,
  onFinish,
  fetching,
  error,
}) => (
  <Spin spinning={fetching}>
    {error && <AlertError error={error} />}
    <Form
      initialValues={{ email }}
      onFinish={({ email: email_ }) => onFinish(email_)}
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

export default EmailUserForm;
