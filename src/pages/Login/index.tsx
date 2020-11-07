import React, { useContext } from 'react';

import { GlobalContext } from 'use/global';
import LoginForm from './LoginForm';
import PageProperties from 'routes/PageProperties';

const Login: React.FC<PageProperties> = () => {
  const { login: { doLogin, error, fetching } } = useContext(GlobalContext);

  return (
    <div style={{ maxWidth: 450, margin: '0 auto' }}>
      <LoginForm {...{ doLogin, fetching, error }} />
    </div>
  );
};

export default Login;
