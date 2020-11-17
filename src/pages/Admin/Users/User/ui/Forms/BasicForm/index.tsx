import React from 'react';
import { notification } from 'antd';

import { useUserBasicUpdateMutation } from 'graphql/generated';
import { FormArguments, UserProfileForm } from 'pages/Admin/Profile/Forms/BasicForm/Form';

interface UserProfileFormProperties {
  userID: number;
  firstName: string;
  lastName: string;
  onSuccess?: (firstName: string, lastName: string) => void;
}

const BasicForm: React.FC<UserProfileFormProperties> = ({ firstName, lastName, userID, onSuccess }) => {
  const [{ fetching, error }, updateName] = useUserBasicUpdateMutation();

  const onFinish = async (values: FormArguments) => {
    const response = await updateName({ ...values, id: userID });
    if (response.data) {
      const { message, type } = response.data.userBasicUpdate.message;
      notification[type]({ message });
      if (onSuccess) {
        const { firstName: firstName_, lastName: lastName_ } = response.data.userBasicUpdate.data;
        onSuccess(firstName_, lastName_);
      }
    }
  };

  return (
    <UserProfileForm {...{ fetching, error, onFinish, defaultValues: { firstName, lastName } }} />
  );
};

export default BasicForm;
