import Index from '../../pages/Index';
import AboutMe from '../../pages/AboutMe';
import ForgotPassword from '../../pages/ForgotPassword';
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
  {
    component: ForgotPassword,
    exact: true,
    path: '/forgot-password',
  },
];

export default routes;
