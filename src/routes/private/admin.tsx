import { RoutePropertiesParameters } from '../interfaces';
import Profile from '../../pages/Admin/Profile';
import Users from '../../pages/Admin/Users';
import User from '../../pages/Admin/Users/User';

const routes: RoutePropertiesParameters[] = [
  {
    component: Users,
    exact: true,
    path: '/admin/users',
  },
  {
    component: User,
    exact: true,
    path: '/admin/users/:userID',
    params: { userID: 'asd' },
  },
  {
    component: User,
    exact: true,
    path: '/admin/users/:userID/roles',
    params: { userID: 'asd' },
  },
  {
    component: Profile,
    exact: true,
    path: '/admin/profile',
  },
];

export default routes;
