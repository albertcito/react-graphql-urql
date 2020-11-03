import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';

import { useUsersQuery } from 'graphql/generated';
import UsersTable from 'ui/Users/Table';

const Users: React.FC = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [orderBy, setOrderBy] = useState<string>();
  const [{ data, fetching }] = useUsersQuery(
    { variables: { limit, page, search, order, orderBy } },
  );

  if (fetching && !data) {
    return <div> Loading... </div>;
  }

  if (data) {
    return (
      <div>
        <Title level={1}>
          Users
        </Title>
        <UsersTable
          loading={fetching}
          users={data.users.data}
          pagination={data.users.pagination}
          fetchMore={({ page: page_, limit: limit_, search: search_, order: order_ }) => {
            setLimit(limit_);
            setPage(page_);
            setSearch(search_);
            if (order_) {
              setOrder(order_.order);
              setOrderBy(order_.orderBy);
            }
          }}
        />
      </div>
    );
  }
  return <div>sdasdas</div>;
};

export default Users;
