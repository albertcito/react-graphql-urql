import React from 'react';
import { notification } from 'antd';

import { useProfileBasicUpdateMutation } from 'graphql/generated';
import { UserProfileForm, FormArguments } from './Form';

interface UserProfileFormProperties {
  firstName: string;
  lastName: string;
  onSuccess: (firstName: string, lastName: string) => void;
}

const BasicForm: React.FC<UserProfileFormProperties> = ({ firstName, lastName, onSuccess }) => {
  const [{ fetching, error }, updateName] = useProfileBasicUpdateMutation();

  const onFinish = async (variables: FormArguments) => {
    const response = await updateName(variables);
    if (response.data) {
      const { message, type } = response.data.profileBasicUpdate.message;
      notification[type]({ message });
      const { firstName: firstName_, lastName: lastName_ } = response.data.profileBasicUpdate.data;
      onSuccess(firstName_, lastName_);
    }
  };

  return (
    <UserProfileForm {...{ fetching, error, onFinish, defaultValues: { firstName, lastName } }} />
  );
};

export default BasicForm;
