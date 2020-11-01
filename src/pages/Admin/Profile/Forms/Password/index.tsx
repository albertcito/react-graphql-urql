import React, { useContext } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import { ApolloError } from '@apollo/client';

import { useProfileUpdatePasswordMutation } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';
import { GlobalContext } from 'use/global';
import { getValidationErrors } from 'util/Errors/getErrors';

interface OnFinishArguments {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordForm: React.FC = () => {
  const { sessions: { user } } = useContext(GlobalContext);
  const [updatePasword, { loading, error }] = useProfileUpdatePasswordMutation({
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) {
        notification.success({ message: 'Pasword updated' });
      }
    },
  });

  const validationErrors = getValidationErrors<OnFinishArguments>(error);
  return (
    <div>
      {error && <AlertError error={error} />}
      <Spin spinning={loading}>
        <Form autoComplete='off' onFinish={(variables: OnFinishArguments) => updatePasword({ variables }) }>
          <input
            type='email'
            autoComplete='email'
            value={user?.email}
            readOnly
            style={{ display: 'none' }}
          />

          <Form.Item
            name='password'
            hasFeedback
            validateStatus={validationErrors?.errors.password && 'error'}
            help={validationErrors?.errors.password}
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
            validateStatus={validationErrors?.errors.newPassword && 'error'}
            help={validationErrors?.errors.newPassword}
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
            validateStatus={validationErrors?.errors.confirmNewPassword && 'error'}
            help={validationErrors?.errors.confirmNewPassword}
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
};

export default PasswordForm;
