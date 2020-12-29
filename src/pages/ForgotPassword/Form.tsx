import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import { required } from 'rules/required';
import AlertError from 'ui/Alert/AlertError';

interface ForgotPasswordFormProperties {
  fetching: boolean;
  error?: CombinedError;
  onFinish: (values: { email: string }) => void;
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProperties> = ({
  fetching,
  error,
  onFinish,
}) => (
  <div>
    {error && <AlertError error={error} />}
    <Spin spinning={fetching}>
      <Form autoComplete='off' onFinish={onFinish}>
        <Form.Item
          name='email'
          hasFeedback
          rules={[
            required('Please confirm your email'),
            { type: 'email', message: 'The input is not valid E-mail' },
          ]}
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
  </div>
);

export default ForgotPasswordForm;
