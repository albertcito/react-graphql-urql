import React from 'react';
import { Col, Divider, Row } from 'antd';

import UserTitle from 'ui/User/UserTitle';
import PageProperties from 'routes/PageProperties';
import { useUserQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserMenu from './Menu';
import UserForms from './ui/Forms';

export interface UserRoute {
  userID: string;
}
const User: React.FC<PageProperties<UserRoute>> = ({ route }) => {
  const userID = parseInt(route.match.params.userID, 10);
  const [{ data, fetching, error }] = useUserQuery({ variables: { userID } });

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div className='content-width'>
      <UserTitle {...{
        name: data.user.fullName,
        emailVerified: data.user.emailVerified,
        userStatusID: 'active',
      }}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={6}>
          <UserMenu userID={data.user.userID} />
        </Col>
        <Col span={18}>
          <UserForms user={data.user} />
        </Col>
      </Row>
    </div>
  );
};

export default User;
