import { useCallback, useEffect, useState } from 'react';
import { CombinedError } from '@urql/core';

import useSession, { UseSessionProperties } from 'use/global/useSession';
import storage from 'util/Storage';
import useIntl, { LangEnum, UseIntlFormat } from './useIntl';
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
  intl: UseIntlFormat;
  langs: LangProperties[];
  langID: string;
  setLang: (langID: string) => void;
}

const useGlobal = (): UseGlobalProperties => {
  const { getSession, delSession, ...sessions } = useSession();
  const intl = useIntl();
  const [langID, setLangID] = useState<string>('EN');

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

  const setLang = useCallback((langID_: string) => {
    setLangID(langID_);
    intl.setLang(langID_ as LangEnum);
    storage.setLangID(langID_);
  }, [intl]);

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
    setLang,
  };
};

export default useGlobal;
