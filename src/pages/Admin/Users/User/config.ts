export enum userViewEnum {
  roles='roles',
  profile='profile',
  statusLog='status-log',
  emailsLog='emails-log',
}

export const getViewCode = (route: string, userID: number) => {
  switch (true) {
    case route.includes('roles'): return userViewEnum.roles;
    case route.includes('status-log'): return userViewEnum.statusLog;
    case route.includes('emails-log'): return userViewEnum.emailsLog;
    case (route === `/admin/users/${userID}`): return userViewEnum.profile;
    default: throw new Error(`The route ${route} for the user ${userID} cannot be found`);
  }
};
