import { createContext, useState } from 'react';

import { LoggedUserMutation } from 'graphql/generated';

export interface UseUserReturn {
  user?: LoggedUserMutation['loggedUser'];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user?: LoggedUserMutation['loggedUser']) => void;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<LoggedUserMutation['loggedUser']>();
  return {
    user,
    setUser,
  };
};

export default createContext({} as UseUserReturn);
