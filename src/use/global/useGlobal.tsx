import { useEffect, useState } from 'react';
import { CombinedError } from '@urql/core';

import useSession, { UseSessionProperties } from 'use/global/useSession';
import storage from 'util/Storage';
import useIntl, { UseIntlFormat } from './useIntl';
import { useLoginMutation, useLogoutMutation } from 'graphql/generated';
import { LangProperties, langs } from './public';

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
  langs: LangProperties[];
  langID: string;
}

const useGlobal = (): UseGlobalProperties => {
  const { getSession, delSession, ...sessions } = useSession();
  const intl = useIntl();
  const [langID] = useState<string>('EN');

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
    intl,
    langs,
    langID,
  };
};

export default useGlobal;
