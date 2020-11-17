import { useCallback, useContext } from 'react';

import storage from 'util/Storage';
import { useLoggedUserMutation, LoggedUserMutation } from 'graphql/generated';
import UserContext from 'use/user/UserContext';

type UserSession = LoggedUserMutation['loggedUser'];

export interface UseSessionProperties {
  fetching: boolean;
  getSession: () => void;
  delSession: () => void;
  saveSession: (data: UserSession, accessToken?: string) => void;
}

/**
 * This function is to load and remove the user information
 * in the localStorage and the hook's status
 */
const useSession = (): UseSessionProperties => {
  const { setUser } = useContext(UserContext);

  const saveSession = useCallback((data: UserSession, accessToken?: string) => {
    storage.setUserID(data.id);
    setUser(data);
    if (accessToken) {
      storage.setToken(accessToken);
    }
  }, [setUser]);

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
  }, [setUser]);

  return {
    getSession,
    delSession,
    saveSession,
    fetching,
  };
};

export default useSession;
