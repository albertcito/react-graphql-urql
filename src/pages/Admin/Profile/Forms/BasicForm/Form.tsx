import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { CombinedError } from 'urql';
import { FormattedMessage } from 'react-intl';

import AlertError from 'ui/Alert/AlertError';

export interface FormArguments {
  firstName: string;
  lastName: string;
}

interface UserProfileFormProperties {
  defaultValues: FormArguments;
  onFinish: (values: FormArguments) => void;
  fetching: boolean;
  error?: CombinedError;
}

export const UserProfileForm: React.FC<UserProfileFormProperties> = ({
  defaultValues,
  onFinish,
  fetching,
  error,
}) => (
  <Spin spinning={fetching}>
    {error && <AlertError error={error} />}
    <Form
      initialValues={defaultValues}
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
          disabled={fetching}
        >
          <FormattedMessage id='generic.submit' />
        </Button>
      </Form.Item>
    </Form>
  </Spin>
);
