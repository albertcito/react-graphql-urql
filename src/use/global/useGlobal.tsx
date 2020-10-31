import { useEffect } from 'react';
import { ApolloError } from '@apollo/client';

import useSession, { UseSessionProperties } from 'use/global/useSession';
import storage from 'util/Storage';
import useUnauthorized from './useUnauthorized';
// import useStartData, { StartDataFormat } from './useStartData';
import useIntl, { UseIntlFormat } from './useIntl';
import { useLoginLazyQuery, useLogoutLazyQuery } from 'graphql/generated';

export interface UseGlobalProperties {
  sessions: Omit<UseSessionProperties, 'getSession' >;
  logout: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doLogout: () => void;
    loading: boolean;
    error?: ApolloError;
  };
  login: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doLogin: (email: string, password: string) => void;
    loading: boolean;
    error?: ApolloError;
  };
  // appData: Omit<StartDataFormat, 'getData'>;
  intl: UseIntlFormat;
}

const useGlobal = (): UseGlobalProperties => {
  const { getSession, delSession, ...sessions } = useSession();
  // const { getData, ...appData } = useStartData();
  const intl = useIntl();

  const [doLogout, { loading: loadingLogout, error: logoutError }] = useLogoutLazyQuery({
    onCompleted: () => delSession(),
    onError: console.log,
  });

  const [login, { loading: loadingLogin, error: loginError }] = useLoginLazyQuery({
    onCompleted: (response) => sessions.saveSession(response.login.user, response.login.token),
    onError: console.log,
  });

  const doLogin = (email: string, password: string) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  useUnauthorized(delSession);

  useEffect(() => {
    const userID = storage.getUserID();
    if (userID) {
      getSession(userID);
    }
  }, [getSession]);

  // useEffect(() => { getData(); }, [getData]);

  return {
    sessions: {
      ...sessions,
      delSession,
    },
    logout: {
      doLogout,
      loading: loadingLogout,
      error: logoutError,
    },
    login: {
      doLogin,
      loading: loadingLogin,
      error: loginError,
    },
    // appData,
    intl,
  };
};

export default useGlobal;
