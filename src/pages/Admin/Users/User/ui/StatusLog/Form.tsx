import { Form, Input, Spin, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { CombinedError } from 'urql';

import { useUserStatusesQuery } from 'graphql/generated';
import { min, required } from 'rules/required';
import NoDataUrql from 'ui/NoDataUrql';

interface StatusLogFormProperties {
  form: FormInstance;
  fetching?: boolean;
  error?: CombinedError;
}

export interface FormProperties {
  userStatusID: string;
  reason: string;
}

const StatusLogForm: React.FC<StatusLogFormProperties> = ({ form, fetching, error }) => {
  const [{ data: userStatus, fetching: userFetching, error: userStatusError }] = useUserStatusesQuery();

  if (!userStatus) {
    return <NoDataUrql fetching={userFetching} error={userStatusError} />;
  }

  return (
    <Spin spinning={fetching}>
      {error && <NoDataUrql fetching={false} error={error} />}
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Status'
          name='userStatusID'
          hasFeedback
          rules={[
            required('Please select the status'),
            min(6, 'Password must be at least 6 characters'),
          ]}
        >
          <Select>
            {
              userStatus.userStatuses.map((userState) => (
                <Select.Option value={userState.id} key={userState.id}>
                  {userState.name.text}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label='Reason'
          name='reason'
          rules={[
            required('Please complete the reason'),
            min(6, 'Reason must be at least 20 characters'),
          ]}
        >
          <Input.TextArea autoSize allowClear />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default StatusLogForm;
