import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';

import AlertError from 'ui/Alert/AlertError';

export interface OnFinishArguments {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface PasswordProfileForm {
  email: string;
  fetching: boolean;
  error?: CombinedError;
  onFinish: (values: OnFinishArguments) => void;
}
export const PasswordProfileForm: React.FC<PasswordProfileForm> = ({
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
          // validateStatus={validationErrors?.errors.password && 'error'}
          // help={validationErrors?.errors.password}
        >
          <Input.Password
            autoComplete='password'
            size='large'
            placeholder='Current password'
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          name='newPassword'
          hasFeedback
          // validateStatus={validationErrors?.errors.newPassword && 'error'}
          // help={validationErrors?.errors.newPassword}
        >
          <Input.Password
            autoComplete='newPassword'
            size='large'
            placeholder='New Password'
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          name='confirmNewPassword'
          dependencies={['newPassword']}
          hasFeedback
          // validateStatus={validationErrors?.errors.confirmNewPassword && 'error'}
          // help={validationErrors?.errors.confirmNewPassword}
        >
          <Input.Password
            autoComplete='new-password'
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
