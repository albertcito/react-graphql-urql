import React, { useContext } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import { MutationTuple } from '@apollo/client/react/types/types';


import { useProfileUpdatePasswordMutation } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';
import { GlobalContext } from 'use/global';
import { getValidationErrors } from 'util/Errors/getErrors';

interface OnFinishArguments {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type useMutationFnType<TQuery, TVariables> = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  baseOptions?: MutationHookOptions<TQuery, TVariables>
) => MutationTuple<TQuery, TVariables>;

function useMutation<TQuery, TVariables>(
  mutation: useMutationFnType<TQuery, TVariables>,
  baseOptions?: MutationHookOptions<TQuery, TVariables>,
) {
  const onError = (error: ApolloError) => {
    if (baseOptions && baseOptions.onError) {
      baseOptions.onError(error);
    }
    return false;
  };

  const options = {
    ...baseOptions,
    onError,
  };
  return mutation(options);
}

const PasswordForm: React.FC = () => {
  const { sessions: { user } } = useContext(GlobalContext);
  const [updatePasword, { loading, error }] = useMutation(
    useProfileUpdatePasswordMutation,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data) {
          const { message, type } = data.profileUpdatePassword.message;
          notification[type]({ message });
        }
      },
    },
  );

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
