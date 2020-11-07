import { GlobalLayout } from 'templates';
import privateRoutes from './private';
import publicRoutes from './public';
import sessionRoutes from './session';
import { RouteTypeEnum } from './routeTypes';
import { RouteTemplateProperties } from './interfaces';

const routesTemplate: RouteTemplateProperties[] = [
  {
    routes: publicRoutes,
    template: GlobalLayout,
    type: RouteTypeEnum.public,
  },
  {
    routes: privateRoutes,
    template: GlobalLayout,
    type: RouteTypeEnum.private,
  },
  {
    routes: sessionRoutes,
    template: GlobalLayout,
    type: RouteTypeEnum.session,
  },
];
export default routesTemplate;
