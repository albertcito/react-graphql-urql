import React from 'react';
import { notification } from 'antd';

import { useProfileUpdateEmailMutation } from 'graphql/generated';
import { EmailProfileForm, OnFinishArguments } from './Form';

interface EmailFormProperties {
  email: string;
  onSuccess: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProperties> = ({ email, onSuccess }) => {
  const [{ fetching, error }, updateEmail] = useProfileUpdateEmailMutation();

  const onFinish = async (variables: OnFinishArguments) => {
    const response = await updateEmail(variables);
    if (response.data) {
      const { message, type } = response.data.profileUpdateEmail.message;
      notification[type]({ message });
      onSuccess(response.data.profileUpdateEmail.data.email);
    }
  };

  return (
    <EmailProfileForm {...{ fetching, error, onFinish, email }} />
  );
};

export default EmailForm;
