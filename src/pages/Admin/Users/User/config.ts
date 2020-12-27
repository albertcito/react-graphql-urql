export enum userViewEnum {
  roles='roles',
  profile='profile',
  statusLog='status-log',
  emailsLog='emails-log',
  passwordsLog='passwords-log',
  emailsSent='emails-sent',
  tokens='tokens',
  authAccess='auth-access',
}

export const getViewCode = (route: string, userID: number) => {
  switch (true) {
    case route.includes(userViewEnum.roles): return userViewEnum.roles;
    case route.includes(userViewEnum.statusLog): return userViewEnum.statusLog;
    case route.includes(userViewEnum.emailsLog): return userViewEnum.emailsLog;
    case route.includes(userViewEnum.passwordsLog): return userViewEnum.passwordsLog;
    case route.includes(userViewEnum.emailsSent): return userViewEnum.emailsSent;
    case route.includes(userViewEnum.tokens): return userViewEnum.tokens;
    case route.includes(userViewEnum.authAccess): return userViewEnum.authAccess;
    case (route === `/admin/users/${userID}`): return userViewEnum.profile;
    default: throw new Error(`The route ${route} for the user ${userID} cannot be found`);
  }
};
