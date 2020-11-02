import React from 'react';
import { IntlProvider } from 'react-intl';
import { createClient, Provider } from 'urql';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import constants from 'config/constants';

const client = createClient({
  url: `${constants.urlServer}/graphql/public`,
  fetchOptions: () => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
      withCredentials: true,
    };
  },
});

const GlobalSomething: React.FC = () => {
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

const StartApp = () => (
  <Provider value={client}>
    <GlobalSomething />
  </Provider>
);

export default StartApp;
