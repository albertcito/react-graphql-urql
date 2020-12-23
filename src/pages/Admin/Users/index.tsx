import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { useUsersQuery } from 'graphql/generated';
import UsersTable, { User } from 'ui/Users/Table';
import AlertError from 'ui/Alert/AlertError';
import NoDataUrql from 'ui/NoDataUrql';
import PageProperties from 'routes/PageProperties';

function getURLParameters(query: string) {
  const { page, limit, search, order, orderBy } = queryString.parse(query, { parseNumbers: true });
  return {
    page: Number.isInteger(page) ? page as number : 1,
    limit: Number.isInteger(limit) ? limit as number : 10,
    search: search as string ?? undefined,
    order: order as 'ASC'|'DESC' ?? undefined,
    orderBy: orderBy as string ?? undefined,
  };
}

const Users: React.FC<PageProperties> = ({ route }) => {
  const routeLocationSearch = route.location.search;
  const [urlQuery] = useState(getURLParameters(routeLocationSearch));
  const [page, setPage] = useState<number>(urlQuery.page);
  const [limit, setLimit] = useState<number>(urlQuery.limit);
  const [search, setSearch] = useState<string>(urlQuery.search);
  const [order, setOrder] = useState(urlQuery.order);
  const [orderBy, setOrderBy] = useState<string>(urlQuery.orderBy);
  const [{ data, fetching, error }] = useUsersQuery(
    { variables: { limit, page, search, order, orderBy } },
  );
  useWindowTitle('Users');
  useEffect(() => {
    const parameters = getURLParameters(routeLocationSearch);
    setPage(parameters.page);
    setLimit(parameters.limit);
    setSearch(parameters.search);
    setOrder(parameters.order);
    setOrderBy(parameters.orderBy);
  }, [routeLocationSearch, urlQuery]);
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
        initialSearch={search}
        initialOrder={order}
        initialOrderBy={orderBy}
        dataSource={data.users.data}
        getLink={(user: User) => `${route.location.pathname}/${user.id}`}
        pagination={data.users.pagination}
        fetchMore={({ order: order_, ...other }) => {
          route.history.push({
            pathname: route.match.path,
            search: `?${queryString.stringify({ ...other, ...order_ })}`,
          });
        }}
      />
    </div>
  );
};

export default Users;
