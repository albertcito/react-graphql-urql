import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as URQLProvider } from 'urql';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import UserContext, { useUser } from 'use/user/UserContext';
import getURQLClient from './urql/getURQLClient';

const GlobalStatus: React.FC = () => {
  const global = useGlobal();
  return (
    <GlobalContext.Provider value={global}>
      <IntlProvider
        locale={global.intl.lang}
        messages={global.intl.messages}
        defaultLocale={global.intl.defaultLocale}
      >
        <Routes />
      </IntlProvider>
    </GlobalContext.Provider>
  );
};

const urql = getURQLClient();
const StartApp: React.FC = () => {
  const { setUser, ...props } = useUser();
  return (
    <UserContext.Provider value={{ ...props, setUser }}>
      <URQLProvider value={urql}>
        <GlobalStatus />
      </URQLProvider>
    </UserContext.Provider>
  );
};

export default StartApp;
