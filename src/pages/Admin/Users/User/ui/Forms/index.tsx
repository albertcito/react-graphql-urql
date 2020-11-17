import React from 'react';
import { Row, Tabs } from 'antd';

import BasicForm from './BasicForm';
import { UserQuery } from 'graphql/generated';
import EmailForm from './Email';
import PasswordForm from './Password';

const { TabPane } = Tabs;

interface UserFormsProperties {
  user: UserQuery['user'];
}

const UserForms: React.FC<UserFormsProperties> = ({ user }) => {
  return (
    <div>
      <Row gutter={16}>
        <Tabs defaultActiveKey='name' style={{ width: '100%' }}>
          <TabPane
            tab='Name'
            key='name'
          >
            <BasicForm
              userID={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          </TabPane>
          <TabPane
            tab='Email'
            key='email'
          >
            <EmailForm userID={user.id} email={user.email} />
          </TabPane>
          <TabPane
            tab='Password'
            key='password'
          >
            <PasswordForm email={user.email} userID={user.id} />
          </TabPane>
        </Tabs>
      </Row>
    </div>
  );
};

export default UserForms;
