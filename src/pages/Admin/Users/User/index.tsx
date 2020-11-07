import React from 'react';
import { Col, Divider, Row } from 'antd';

import UserTitle from 'ui/User/UserTitle';
import PageProperties from 'routes/PageProperties';

export interface UserRoute {
  userID: number;
}
const User: React.FC<PageProperties<UserRoute>> = ({ route }) => {
  const { userID } = route.match.params;
  return (
    <div className='content-width'>
      <UserTitle {...{
        name: 'user.fullName',
        emailVerified: true,
        userStatusID: 'active',
      }}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={6}>
          {userID}
        </Col>
        <Col span={18}>
          Hello
        </Col>
      </Row>
    </div>
  );
};

export default User;
