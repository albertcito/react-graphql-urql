import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin } from 'antd';

import { useProfileBasicUpdateMutation } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';

interface UserProfileFormProperties {
  firstName: string;
  lastName: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess: (firstName: string, lastName: string) => void;
}

interface OnFinishArguments {
  firstName: string;
  lastName: string;
}

const UserProfileForm: React.FC<UserProfileFormProperties> = ({ firstName, lastName, onSuccess }) => {
  const [{ fetching, error }, updateName] = useProfileBasicUpdateMutation();

  const onFinish = async (variables: OnFinishArguments) => {
    const response = await updateName(variables);
    if (response.data) {
      const { message, type } = response.data.profileBasicUpdate.message;
      notification[type]({ message });
      const { firstName: firstName_, lastName: lastName_ } = response.data.profileBasicUpdate.data;
      onSuccess(firstName_, lastName_);
    }
  };

  return (
    <Spin spinning={fetching}>
      {error && <AlertError error={error} />}
      <Form
        initialValues={{ firstName, lastName }}
        onFinish={onFinish}
      >
        <Form.Item
          name='firstName'
          hasFeedback
        >
          <Input
            autoComplete='firstName'
            placeholder='First name'
            size='large'
            autoFocus
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name='lastName'
          hasFeedback
        >
          <Input
            autoComplete='lastName'
            placeholder='Last name'
            size='large'
            autoFocus
            prefix={<UserOutlined />}
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
  );
};

export default UserProfileForm;
