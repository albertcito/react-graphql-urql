import Profile from '../../pages/Admin/Profile';
import Users from '../../pages/Admin/Users';
import { RouteProperties } from '../interfaces';

const routes: RouteProperties[] = [
  {
    component: Users,
    exact: true,
    path: '/admin/users',
  },
  {
    component: Profile,
    exact: true,
    path: '/admin/profile',
  },
];

export default routes;
