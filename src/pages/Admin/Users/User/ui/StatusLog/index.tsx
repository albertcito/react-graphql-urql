import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useUserStatusReasonsQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserStatusReasonsTable from './Table';

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
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <Title level={3}>
        Users Status Log
      </Title>
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