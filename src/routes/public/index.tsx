import Index from '../../pages/Index';
import AboutMe from '../../pages/AboutMe';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
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
  {
    component: ResetPassword,
    exact: true,
    path: '/reset-password',
  },
];

export default routes;
