import React from 'react';
import { notification } from 'antd';

import { useUserUpdateEmailMutation } from 'graphql/generated';
import EmailUserForm from './Form';

interface EmailFormProperties {
  userID: number;
  email: string;
  onSuccess?: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProperties> = ({ email, userID, onSuccess }) => {
  const [{ fetching, error }, updateEmail] = useUserUpdateEmailMutation();

  const onFinish = async (email_: string) => {
    const response = await updateEmail({ email: email_, id: userID });
    if (response.data) {
      const { message, type } = response.data.userUpdateEmail.message;
      notification[type]({ message });
      if (onSuccess) {
        onSuccess(response.data.userUpdateEmail.data.email);
      }
    }
  };

  return (
    <EmailUserForm {...{ fetching, error, onFinish, email }} />
  );
};

export default EmailForm;
