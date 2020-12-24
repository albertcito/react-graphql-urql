import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Button } from 'antd';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useUserStatusReasonsQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserStatusReasonsTable from './Table';
import StatusLogModal from './Modal';

interface StatusLogProperties {
  user: UserQuery['user'];
}
const StatusLog: React.FC<StatusLogProperties> = ({ user }) => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>();
  const [orderBy, setOrderBy] = useState<string>();
  const [{ error, fetching, data }] = useUserStatusReasonsQuery(
    { variables: { userID: user.id, limit, page, order, orderBy } },
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
        reasons={data.userStatusReasons.data}
        pagination={data.userStatusReasons.pagination}
        loading={fetching}
        fetchMore={({ page: page_, limit: limit_, order: order_ }) => {
          setLimit(limit_);
          setPage(page_);
          if (order_) {
            setOrder(order_.order);
            setOrderBy(order_.orderBy);
          }
        }}
      />
    </div>
  );
};

export default StatusLog;
