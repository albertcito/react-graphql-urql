import Index from '../../pages/Index';
import AboutMe from '../../pages/AboutMe';
import { RoutePropertiesParameters } from '../interfaces';

const routes: RoutePropertiesParameters[] = [
  {
    component: Index,
    exact: true,
    path: '/',
  },
  {
    component: AboutMe,
    exact: true,
    path: '/about-me',
  },
];

export default routes;
