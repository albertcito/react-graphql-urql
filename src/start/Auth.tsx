import React, { useContext } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import Validator from 'validatorjs';

import { RoutePropertiesParameters } from 'routes/interfaces';
import { isPrivate, RouteTypeEnum, isSession } from 'routes/routeTypes';
import { GlobalLayout } from 'templates/';
import { Error403, Error404 } from 'templates/errors';
import LayoutPageProperties from 'templates/interfaces/LayoutPageProperties';
import { GlobalContext } from 'use/global';
import UserContext from 'use/user/UserContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AuthProperties<T = any> {
  route: RoutePropertiesParameters;
  Template: React.FC<LayoutPageProperties>;
  reactRouter: RouteComponentProps<T>;
  type: RouteTypeEnum;
}
const Auth: React.FC<AuthProperties> = ({ route, Template, reactRouter, type }) => {
  const { user } = useContext(UserContext);
  const {
    sessions: { fetching },
    logout: { fetching: logoutLoading },
  } = useContext(GlobalContext);

  if (fetching) {
    return <>...loading</>;
  }

  if (isPrivate(type) && !user) {
    return <GlobalLayout Component={Error403} route={reactRouter} />;
  }
  if (isSession(type) && user) {
    return <Redirect to='/' />;
  }

  if (route.params && (new Validator(reactRouter.match.params, route.params)).fails()) {
    return <GlobalLayout Component={Error404} route={reactRouter} />;
  }

  const Layout = route.template ?? Template;
  return (
    <Spin spinning={logoutLoading}>
      <Layout
        Component={route.component}
        route={reactRouter}
      />
    </Spin>
  );
};

export default Auth;
