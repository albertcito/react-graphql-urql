import React, { useContext } from 'react';

import UserContext from 'use/user/UserContext';
import PageProperties from 'routes/PageProperties';
import ProfileView from './ProfileView';

const Profile: React.FC<PageProperties> = () => {
  const { user, setName, setEmail } = useContext(UserContext);
  if (!user) {
    return <div>Must be logged</div>;
  }
  return (
    <ProfileView {...{ user, setName, setEmail }} />
  );
};
export default Profile;
