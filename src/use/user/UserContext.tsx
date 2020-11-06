import { createContext, useCallback, useState } from 'react';

import { LoggedUserMutation } from 'graphql/generated';

export interface UseUserReturn {
  user?: LoggedUserMutation['loggedUser'];
  setUser: (user?: LoggedUserMutation['loggedUser']) => void;
  setEmail: (email: string) => void;
  setName: (firstName: string, lastName: string) => void;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<LoggedUserMutation['loggedUser']>();
  const setEmail = useCallback((email: string) => {
    setUser((data) => ({ ...data, email }) as LoggedUserMutation['loggedUser']);
  }, []);
  const setName = useCallback((firstName: string, lastName: string) => {
    setUser((data) => ({ ...data, firstName, lastName }) as LoggedUserMutation['loggedUser']);
  }, []);
  return {
    user,
    setUser,
    setEmail,
    setName,
  };
};

export default createContext({} as UseUserReturn);
