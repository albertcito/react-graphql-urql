import React from 'react';
import { notification } from 'antd';

import { useUserUpdatePasswordMutation } from 'graphql/generated';
import { PasswordUserForm, OnFinishArguments } from './Form';

interface PasswordFormProperties {
  email: string;
  userID: number;
}
const PasswordForm: React.FC<PasswordFormProperties> = ({ email, userID }) => {
  const [{ fetching, error }, updatePasword] = useUserUpdatePasswordMutation();

  const onFinish = async ({ password }: OnFinishArguments) => {
    const response = await updatePasword({ password, userID });
    if (response.data) {
      const { message, type } = response.data.userUpdatePassword.message;
      notification[type]({ message });
    }
  };

  return (
    <PasswordUserForm {...{ email, fetching, onFinish, error }} />
  );
};

export default PasswordForm;
