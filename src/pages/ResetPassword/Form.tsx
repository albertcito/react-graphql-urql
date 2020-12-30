import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import rulePass from 'rules/password';
import { min, required } from 'rules/required';
import AlertError from 'ui/Alert/AlertError';

export interface OnFinishArguments {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProperties {
  fetching: boolean;
  error?: CombinedError;
  onFinish: (values: OnFinishArguments) => void;
}
export const ResetPasswordForm: React.FC<ResetPasswordFormProperties> = ({
  fetching,
  error,
  onFinish,
}) => {
  const passMinRule = min(6, 'Password must be at least 6 characters');
  return (
    <div>
      {error && <AlertError error={error} />}
      <Spin spinning={fetching}>
        <Form autoComplete='off' onFinish={onFinish}>
          <Form.Item
            name='password'
            hasFeedback
            rules={[
              required('Please input a password!'),
              passMinRule,
            ]}
          >
            <Input.Password
              size='large'
              placeholder='New Password'
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              required('Please confirm new password'),
              passMinRule,
              ({ getFieldValue }) => rulePass(getFieldValue, 'password'),
            ]}
          >
            <Input.Password
              size='large'
              placeholder='Confirm new password'
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
    </div>
  );
};
