import React, { useContext } from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from 'use/global';
import LoginForm from './LoginForm';
import PageProperties from 'routes/PageProperties';

const onClick = () => notification.info({
  message: 'To be implemented',
  description: 'This feature will be implemented ASAP.',
});

const Login: React.FC<PageProperties> = () => {
  const { login: { doLogin, error, fetching } } = useContext(GlobalContext);
  const history = useHistory();

  return (
    <div style={{ maxWidth: 450, margin: '0 auto' }}>
      <LoginForm
        {...{ doLogin, fetching, error }}
        onForgotPassword={() => history.push('/forgot-password')}
        onSingUp={onClick}
      />
    </div>
  );
};

export default Login;
