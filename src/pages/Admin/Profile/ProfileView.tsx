import React from 'react';
import { Typography, Tabs } from 'antd';

import UserTitle from 'ui/User/UserTitle';
import { EmailForm, PasswordForm, BasicForm } from './Forms';
import { UseUserReturn } from 'use/user/UserContext';
import { LoggedUserMutation } from 'graphql/generated';

const { Title } = Typography;
const { TabPane } = Tabs;

interface ProfileViewPorperties extends Pick<UseUserReturn, 'setName' | 'setEmail'> {
  user: LoggedUserMutation['loggedUser'];
}

const ProfileView: React.FC<ProfileViewPorperties> = ({
  user,
  setName,
  setEmail,
}) => (
  <div>
    <Title>
      Profile
    </Title>
    <UserTitle {...{
      name: user.fullName,
      emailVerified: user.emailVerified,
      userStatusID: 'active',
    }}
    />
    <Tabs defaultActiveKey='name' style={{ width: '100%' }}>
      <TabPane
        tab='Name'
        key='name'
      >
        <BasicForm firstName={user.firstName} lastName={user.lastName} onSuccess={setName} />
      </TabPane>
      <TabPane
        tab='Email'
        key='email'
      >
        <EmailForm email={user.email} onSuccess={setEmail} />
      </TabPane>
      <TabPane
        tab='Password'
        key='password'
      >
        <PasswordForm email={user.email} />
      </TabPane>
    </Tabs>
  </div>
);
export default ProfileView;
