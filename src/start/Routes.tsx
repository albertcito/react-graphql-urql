import React from 'react';
import {
  Route,
  Switch,
  HashRouter,
} from 'react-router-dom';

import routesTemplates from 'routes';
import { GlobalLayout } from 'templates';
import { Error404 } from 'templates/errors';
import Auth from './Auth';

// use BrowserRouter instead HashRouter to remove #
const Routes: React.FC = () => (
  <HashRouter>
    <Switch>
      {
      routesTemplates.map((routesTemplate) => {
        const { routes, template: Template, type } = routesTemplate;
        return routes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            key={route.path}
            render={(reactRouter) => (
              <Auth
                route={route}
                Template={Template}
                reactRouter={reactRouter}
                type={type}
              />
            )}
          />
        ));
      })
    }
      <Route
        render={(route) => (
          <GlobalLayout
            Component={Error404}
            route={route}
          />
        )}
      />
    </Switch>
  </HashRouter>
);

export default Routes;
