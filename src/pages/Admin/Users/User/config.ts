export enum userViewEnum {
  roles='roles',
  profile='profile',
}

export const getViewCode = (route: string, userID: number) => {
  switch (true) {
    case route.includes('roles'): return userViewEnum.roles;
    case (route === `/admin/users/${userID}`): return userViewEnum.profile;
    default: throw new Error(`The route ${route} for the user ${userID} cannot be found`);
  }
};
