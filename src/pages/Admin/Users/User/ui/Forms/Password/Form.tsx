import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import AlertError from 'ui/Alert/AlertError';

export interface OnFinishArguments {
  password: string;
  confirmPassword: string;
}

interface PasswordUserFormProperties {
  email: string;
  fetching: boolean;
  error?: CombinedError;
  onFinish: (values: OnFinishArguments) => void;
}
export const PasswordUserForm: React.FC<PasswordUserFormProperties> = ({
  email,
  fetching,
  error,
  onFinish,
}) => (
  <div>
    {error && <AlertError error={error} />}
    <Spin spinning={fetching}>
      <Form autoComplete='off' onFinish={onFinish}>
        <input
          type='email'
          autoComplete='email'
          value={email}
          readOnly
          style={{ display: 'none' }}
        />
        <Form.Item
          name='password'
          hasFeedback
        >
          <Input.Password
            size='large'
            placeholder='New Password'
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          dependencies={['newPassword']}
          hasFeedback
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
