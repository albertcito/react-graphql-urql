import React from 'react';
import { Col, Divider, Row } from 'antd';

import UserTitle from 'ui/User/UserTitle';
import PageProperties from 'routes/PageProperties';
import { useUserQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserMenu from './Menu';
import UserContent from './UserContent';
import { getViewCode } from './config';

export interface UserRoute {
  id: string;
}

const User: React.FC<PageProperties<UserRoute>> = ({ route }) => {
  const id = Number.parseInt(route.match.params.id, 10);
  const [{ data, fetching, error }] = useUserQuery({ variables: { id } });

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  const view = getViewCode(route.location.pathname, data.user.id);

  return (
    <div className='content-width'>
      <UserTitle {...{
        name: data.user.fullName,
        emailVerified: data.user.emailVerified,
        userStatusID: data.user.userStatusID,
      }}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={6}>
          <UserMenu userID={data.user.id} view={view} />
        </Col>
        <Col span={18}>
          <UserContent user={data.user} view={view} />
        </Col>
      </Row>
    </div>
  );
};

export default User;
