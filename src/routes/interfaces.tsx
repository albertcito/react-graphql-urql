import { FC } from 'react';

import LayoutPageProperties from '../templates/interfaces/LayoutPageProperties';
import { RouteTypeEnum } from './routeTypes';
import PageProperties from './PageProperties';
import { UserRoute } from 'pages/Admin/Users/User';

export interface RouteProperties<RouteParameters> {
  component: FC<PageProperties<RouteParameters>>;
  exact?: boolean;
  params?: {
    [key in keyof RouteParameters]: string;
  };
  path: string;
  template?: FC<LayoutPageProperties>;
}

export type RoutePropertiesParameters = (
  RouteProperties<UserRoute>
);

export interface RouteTemplateProperties {
  routes: RoutePropertiesParameters[];
  template: FC<LayoutPageProperties>;
  type: RouteTypeEnum;
}
