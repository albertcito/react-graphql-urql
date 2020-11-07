import React from 'react';
import { notification } from 'antd';

import { useProfileUpdatePasswordMutation } from 'graphql/generated';
import { PasswordProfileForm, OnFinishArguments } from './Form';

const PasswordForm: React.FC<{ email: string}> = ({ email }) => {
  const [{ fetching, error }, updatePasword] = useProfileUpdatePasswordMutation();

  const onFinish = async (variables: OnFinishArguments) => {
    const response = await updatePasword(variables);
    if (response.data) {
      const { message, type } = response.data.profileUpdatePassword.message;
      notification[type]({ message });
    }
  };

  return (
    <PasswordProfileForm {...{ email, fetching, onFinish, error }} />
  );
};

export default PasswordForm;
