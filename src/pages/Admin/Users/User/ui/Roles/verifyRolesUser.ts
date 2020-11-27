interface UserRole {
  id: string;
}

const verifyRolesUser = (userRoles: UserRole[], role: string): boolean => {
  for (let index = 0; index < userRoles.length; index += 1) {
    const exists = userRoles.some((userRole) => userRole.id === role);
    if (exists) {
      return true;
    }
  }
  return false;
};

export default verifyRolesUser;
