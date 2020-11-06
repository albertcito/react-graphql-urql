import { useEffect } from 'react';
import { CombinedError } from '@urql/core';

import useSession, { UseSessionProperties } from 'use/global/useSession';
import storage from 'util/Storage';
// import useStartData, { StartDataFormat } from './useStartData';
import useIntl, { UseIntlFormat } from './useIntl';
import { useLoginMutation, useLogoutMutation } from 'graphql/generated';

export interface UseGlobalProperties {
  sessions: Omit<UseSessionProperties, 'getSession' >;
  logout: {
    doLogout: () => void;
    fetching: boolean;
    error?: CombinedError;
  };
  login: {
    doLogin: (email: string, password: string) => void;
    fetching: boolean;
    error?: CombinedError;
  };
  // appData: Omit<StartDataFormat, 'getData'>;
  intl: UseIntlFormat;
}

const useGlobal = (): UseGlobalProperties => {
  const { getSession, delSession, ...sessions } = useSession();
  // const { getData, ...appData } = useStartData();
  const intl = useIntl();

  const [{ fetching: loadingLogout, error: logoutError }, logout] = useLogoutMutation();
  const doLogout = () => logout().then(() => delSession());

  const [{ fetching: loadingLogin, error: loginError }, login] = useLoginMutation();

  const doLogin = async (email: string, password: string) => {
    const response = await login({ email, password });
    if (response.data) {
      const { user, token } = response.data.login;
      sessions.saveSession(user, token);
    }
  };

  useEffect(() => {
    if (storage.getToken()) {
      getSession();
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
      fetching: loadingLogout,
      error: logoutError,
    },
    login: {
      doLogin,
      fetching: loadingLogin,
      error: loginError,
    },
    // appData,
    intl,
  };
};

export default useGlobal;
