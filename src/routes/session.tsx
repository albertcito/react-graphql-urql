import Login from '../pages/Login';
import { RoutePropertiesParameters } from './interfaces';

const routes: RoutePropertiesParameters[] = [
  {
    component: Login,
    exact: true,
    path: '/login',
  },
];

export default routes;
