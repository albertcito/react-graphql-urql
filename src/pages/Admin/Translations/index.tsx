import React, { useCallback, useContext } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';
import { notification } from 'antd';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { useTranslationsQuery, useTranslationDeleteMutation } from 'graphql/generated';
import AlertError, { getErrors } from 'ui/Alert/AlertError';
import NoDataUrql from 'ui/NoDataUrql';
import PageProperties from 'routes/PageProperties';
import TranslationTable from 'ui/Translation/Table';
import { GlobalContext } from 'use/global';
import ButtonLink from 'ui/Buttons/ButtonLink';
import { useTableSearch } from 'ui/Tables/SearchTable/useTableSearch';

const Translations: React.FC<PageProperties> = ({ route }) => {
  const { langs, langID } = useContext(GlobalContext);
  useWindowTitle('Translations');
  const { urlQuery, setUrlQuery } = useTableSearch();
  const [{ data, fetching, error }] = useTranslationsQuery({ variables: { ...urlQuery, langID } });
  const [{ fetching: deletingFetching }, onDeleteTranslation] = useTranslationDeleteMutation();
  const onDelete = useCallback(async (id: number) => {
    const response = await onDeleteTranslation({ id });
    if (response.data) {
      const { message, type } = response.data.translationDelete;
      notification[type]({ message });
    }
    if (response.error) {
      notification.error({ message: getErrors(response.error) });
    }
  }, [onDeleteTranslation]);

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <div className='title'>
        <Title level={1}>
          <FormattedMessage id='translation.translations' />
        </Title>
        <ButtonLink link={`${route.location.pathname}/add`} />
      </div>
      {error && <AlertError error={error} />}
      <TranslationTable
        dataSource={data.translations.data}
        loading={fetching || deletingFetching}
        initialValues={urlQuery}
        pagination={data.translations.pagination}
        fetchMore={setUrlQuery}
        getLink={(translation) => `${route.location.pathname}/${translation.id}`}
        langID={langID}
        langs={langs}
        onDelete={(item) => onDelete(item.id)}
      />
    </div>
  );
};

export default Translations;
