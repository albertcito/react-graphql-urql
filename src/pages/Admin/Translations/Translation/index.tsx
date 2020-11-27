import React, { useCallback } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';
import { notification } from 'antd';

import PageProperties from 'routes/PageProperties';
import { useTranslationQuery, useLangsQuery, useTranslationUpdateMutation } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import TranslationForm from './Form/TranslationForm';
import AlertError from 'ui/Alert/AlertError';

export interface TranslationRoute {
  id: string;
}

const Translation: React.FC<PageProperties<TranslationRoute>> = ({ route }) => {
  const id = Number.parseInt(route.match.params.id, 10);
  const [{ data, fetching, error }] = useTranslationQuery({ variables: { id } });
  const [{ data: langs, fetching: langsFetching, error: langsError }] = useLangsQuery();
  const [{ fetching: creating, error: creatingError }, create] = useTranslationUpdateMutation();

  const onUpdate = useCallback(async (values) => {
    const response = await create(values);
    if (response.data) {
      const { message, type } = response.data.translationUpdate.message;
      notification[type]({ message });
    }
  }, [create]);

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  if (!langs) {
    return <NoDataUrql fetching={langsFetching} error={langsError} />;
  }

  return (
    <div>
      <Title level={1}>
        <FormattedMessage id='translation.updateTranslation' />
      </Title>
      {error && <AlertError error={error} />}
      {langsError && <AlertError error={langsError} />}
      <TranslationForm
        translation={data.translation}
        fetching={creating}
        error={creatingError}
        onFinish={(values) => onUpdate({ ...values, id })}
        langs={langs.langs.data}
      />
    </div>
  );
};

export default Translation;
