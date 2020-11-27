import React, { useState } from 'react';
import { List, Button, Switch, Spin } from 'antd';

import verifyRolesUser from './verifyRolesUser';
import { set, StructFormat } from 'util/stateHandler/struct';

interface Text {
  text: string;
}

interface Role {
  id: string;
  nameID: number;
  name: {
    text: string;
  };
  description?: Text | null;
}

interface UseRole {
  id: string;
}

interface RolesFormProperties {
  roles: Role[];
  userRoles: UseRole[];
  onSave: (roles: StructFormat<boolean>) => void;
  loading: boolean;
}

const UserRolesForm: React.FC<RolesFormProperties> = ({
  roles,
  userRoles,
  onSave,
  loading,
}) => {
  // eslint-disable-next-line unicorn/no-reduce
  const defaultState = userRoles.reduce((ac, a) => ({ ...ac, [a.id]: true }), {}) ?? {};
  const [rolesStatus, setRolesStatus] = useState<StructFormat<boolean>>(defaultState);
  return (
    <Spin spinning={loading}>
      <List
        style={{ marginBottom: 20 }}
        itemLayout='horizontal'
        dataSource={roles}
        renderItem={(role) => (
          <List.Item
            actions={[<Switch
              defaultChecked={verifyRolesUser(userRoles, role.id)}
              onChange={(checked) => setRolesStatus(
                (rolesStatus_) => set(rolesStatus_, role.id, checked),
              )}
            />]}
          >
            <List.Item.Meta
              title={`${role.name.text} (${role.id})`}
              description={role.description?.text}
            />
          </List.Item>
        )}
      />
      <div style={{ textAlign: 'right' }}>
        <Button size='small' type='primary' onClick={() => onSave(rolesStatus)}>
          Submit
        </Button>
      </div>
    </Spin>
  );
};

export default UserRolesForm;
