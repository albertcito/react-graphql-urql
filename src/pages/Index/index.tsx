import React, { useContext } from 'react';

import PageProperties from 'routes/PageProperties';
import UserContext from 'use/user/UserContext';
import Private from './Private';
import Public from './Public';

const Index: React.FC<PageProperties> = () => {
  const { user } = useContext(UserContext);
  if (user) return <Private />;
  return <Public />;
};
export default Index;
