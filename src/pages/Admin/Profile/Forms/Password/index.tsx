import React, { useContext } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';

import { useProfileUpdatePasswordMutation } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';
import UserContext from 'use/user/UserContext';
// import { getValidationErrors } from 'util/Errors/getErrors';

interface OnFinishArguments {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const [{ fetching, error }, updatePasword] = useProfileUpdatePasswordMutation();

  // const validationErrors = getValidationErrors<OnFinishArguments>(error);

  const onFinish = async (variables: OnFinishArguments) => {
    const response = await updatePasword(variables);
    if (response.data) {
      const { message, type } = response.data.profileUpdatePassword.message;
      notification[type]({ message });
    }
  };

  return (
    <div>
      {error && <AlertError error={error} />}
      <Spin spinning={fetching}>
        <Form autoComplete='off' onFinish={onFinish}>
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
};

export default PasswordForm;
