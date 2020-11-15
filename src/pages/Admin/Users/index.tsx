import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';

import { useUsersQuery } from 'graphql/generated';
import UsersTable, { User } from 'ui/Users/Table';
import AlertError from 'ui/Alert/AlertError';
import NoDataUrql from 'ui/NoDataUrql';
import PageProperties from 'routes/PageProperties';

const Users: React.FC<PageProperties> = ({ route }) => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [orderBy, setOrderBy] = useState<string>();
  const [{ data, fetching, error }] = useUsersQuery(
    { variables: { limit, page, search, order, orderBy } },
  );

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <Title level={1}>
        <FormattedMessage id='user.users' />
      </Title>
      {error && <AlertError error={error} />}
      <UsersTable
        loading={fetching}
        users={data.users.data}
        getLink={(user: User) => `${route.location.pathname}/${user.userID}`}
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
};

export default Users;
