import { RoutePropertiesParameters } from '../interfaces';
import Profile from '../../pages/Admin/Profile';
import Users from '../../pages/Admin/Users';
import User from '../../pages/Admin/Users/User';
import Translations from '../../pages/Admin/Translations';
import Translation from '../../pages/Admin/Translations/Translation';
import TranslationAdd from '../../pages/Admin/Translations/Translation/Add';

const id = 'required|integer|min:1';

const routes: RoutePropertiesParameters[] = [
  {
    component: Users,
    exact: true,
    path: '/admin/users',
  },
  {
    component: User,
    path: '/admin/users/:id',
    params: { id },
  },
  {
    component: User,
    path: '/admin/users/:id/roles',
    params: { id },
  },
  {
    component: User,
    path: '/admin/users/:id/status-log',
    params: { id },
  },
  {
    component: User,
    path: '/admin/users/:id/emails-log',
    params: { id },
  },
  {
    component: Profile,
    exact: true,
    path: '/admin/profile',
  },
  {
    component: Translations,
    exact: true,
    path: '/admin/translations',
  },
  {
    component: TranslationAdd,
    exact: true,
    path: '/admin/translations/add',
  },
  {
    component: Translation,
    exact: true,
    path: '/admin/translations/:id',
    params: { id },
  },
];

export default routes;
