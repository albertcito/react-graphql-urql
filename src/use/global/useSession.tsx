import { useCallback, useState } from 'react';
import { ApolloError } from '@apollo/client';

import storage from 'util/Storage';
import { useUserSessionLazyQuery, UserSessionQuery } from 'graphql/generated';

type UserSession = UserSessionQuery['user'];

export interface UseSessionProperties {
  user?: UserSession;
  called: boolean;
  loading: boolean;
  error?: ApolloError;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSession: (userID: number) => void;
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

  const [callUser, { called, loading, error }] = useUserSessionLazyQuery({
    context: { clientName: 'public' },
    onCompleted: (data) => {
      saveSession(data.user);
    },
  });

  /**
   * Get data from the current user logged
   *
   * @param userID: number
   */
  const getSession = useCallback(async (userID: number) => {
    callUser({ variables: { userID } });
  }, [callUser]);

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
    called,
    loading,
    error,
  };
};

export default useSession;
