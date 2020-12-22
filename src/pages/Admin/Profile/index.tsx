import React, { useContext } from 'react';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import UserContext from 'use/user/UserContext';
import PageProperties from 'routes/PageProperties';
import ProfileView from './ProfileView';

const Profile: React.FC<PageProperties> = () => {
  const { user, setName, setEmail } = useContext(UserContext);
  useWindowTitle('Profile');
  if (!user) {
    return <div>Must be logged</div>;
  }
  return (
    <ProfileView {...{ user, setName, setEmail }} />
  );
};
export default Profile;
