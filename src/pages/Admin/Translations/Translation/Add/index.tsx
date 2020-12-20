import React, { useCallback } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';
import { notification } from 'antd';

import PageProperties from 'routes/PageProperties';
import { useLangsQuery, useTranslationCreateMutation } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import TranslationForm from '../Form/TranslationForm';
import AlertError from 'ui/Alert/AlertError';

const Translation: React.FC<PageProperties> = ({ route }) => {
  const [{ data: langs, fetching: langsFetching, error: langsError }] = useLangsQuery();
  const [{ fetching: creating, error: updateError }, create] = useTranslationCreateMutation();

  const onCreate = useCallback(async (values) => {
    const response = await create(values);
    if (response.data) {
      const { message, type } = response.data.translationCreate.message;
      notification[type]({ message });
      const URL = route.location.pathname.replace('add', '');
      const newUrl = `${URL}${response.data.translationCreate.data.id}`;
      route.history.replace(newUrl);
    }
  }, [route.history, route.location.pathname, create]);

  if (!langs) {
    return <NoDataUrql fetching={langsFetching} error={langsError} />;
  }

  return (
    <div>
      <Title level={1}>
        <FormattedMessage id='translation.updateTranslation' />
      </Title>
      {langsError && <AlertError error={langsError} />}
      <TranslationForm
        fetching={creating}
        error={updateError}
        onFinish={onCreate}
        langs={langs.langs.data}
      />
    </div>
  );
};

export default Translation;
