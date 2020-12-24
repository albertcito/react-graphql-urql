import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Button } from 'antd';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useUserStatusReasonsQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserStatusReasonsTable from './Table';
import StatusLogModal from './Modal';
import useTable from 'ui/Tables/Table/useTable';

interface StatusLogProperties {
  user: UserQuery['user'];
}
const StatusLog: React.FC<StatusLogProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = useUserStatusReasonsQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Status Log - ${user.fullName}`);
  const [modal, setModal] = useState(false);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <div className='title'>
        <Title level={3}>
          Users Status Log
        </Title>
        <Button type='primary' size='small' onClick={() => setModal(true)}>
          Update
        </Button>
        <StatusLogModal
          userID={user.id}
          visible={modal}
          setVisible={setModal}
        />
      </div>
      <UserStatusReasonsTable
        dataSource={data.userStatusReasons.data}
        pagination={data.userStatusReasons.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default StatusLog;
