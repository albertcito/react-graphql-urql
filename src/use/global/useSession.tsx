import { useCallback, useState } from 'react';
import { ApolloError } from '@apollo/client';

import storage from 'util/Storage';
import { useLoggedUserMutation, LoggedUserMutation } from 'graphql/generated';

type UserSession = LoggedUserMutation['loggedUser'];

export interface UseSessionProperties {
  user?: UserSession;
  fetching: boolean;
  error?: ApolloError;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSession: () => void;
  delSession: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveSession: (data: UserSession, accessToken?: string) => void;
}

/**
 * This function is to load and remove the user information
 * in the localStorage and the hook's status
 */
const useSession = (): UseSessionProperties => {
  const [user, setUser] = useState<UserSession>();

  const saveSession = useCallback((data: UserSession, accessToken?: string) => {
    storage.setUserID(data.userID);
    setUser(data);
    if (accessToken) {
      storage.setToken(accessToken);
    }
  }, []);

  const [{ fetching }, getLoggedUser] = useLoggedUserMutation();

  /**
   * Get data from the current user logged
   *
   * @param userID: number
   */
  const getSession = useCallback(async () => {
    try {
      const response = await getLoggedUser();
      if (response.data) {
        saveSession(response.data.loggedUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getLoggedUser, saveSession]);

  /**
   * Clean user's private data
   */
  const delSession = useCallback((): void => {
    storage.logout();
    setUser(undefined);
  }, []);

  return {
    user,
    getSession,
    delSession,
    saveSession,
    fetching,
  };
};

export default useSession;
