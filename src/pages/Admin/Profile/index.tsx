import React, { useContext } from 'react';
import { Typography, Tabs } from 'antd';

import UserTitle from 'ui/User/UserTitle';
import { EmailForm, PasswordForm, BasicForm } from './Forms';
import UserContext from 'use/user/UserContext';
import PageProperties from 'routes/PageProperties';

const { Title } = Typography;
const { TabPane } = Tabs;

const Profile: React.FC<PageProperties>  = () => {
  const { user, setName, setEmail } = useContext(UserContext);
  if (!user) {
    return <div>Must be logged</div>;
  }
  return (
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
};
export default Profile;
