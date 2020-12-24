import { Modal, notification, Form } from 'antd';
import React, { useCallback } from 'react';

import { useUserStatusUpdateMutation } from 'graphql/generated';
import StatusLogForm, { FormProperties } from './Form';

interface StatusLogModalProperties {
  userID: number;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const StatusLogModal: React.FC<StatusLogModalProperties> = ({
  userID,
  visible,
  setVisible,
}) => {
  const [{ fetching, error }, update] = useUserStatusUpdateMutation();
  const [form] = Form.useForm<FormProperties>();
  const onSubmit = useCallback(async () => {
    const values = await form.validateFields();
    const response = await update({ ...values, userID });
    if (response.data) {
      setVisible(false);
      const { message, type } = response.data.userStatusUpdate;
      notification[type]({ message });
    }
  }, [form, setVisible, update, userID]);

  return (
    <Modal
      title='Update User Status'
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
    >
      <StatusLogForm
        form={form}
        fetching={fetching}
        error={error}
      />
    </Modal>
  );
};

export default StatusLogModal;
