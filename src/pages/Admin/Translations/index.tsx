import React, { useContext, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';

import { useTranslationsQuery } from 'graphql/generated';
import AlertError from 'ui/Alert/AlertError';
import NoDataUrql from 'ui/NoDataUrql';
import PageProperties from 'routes/PageProperties';
import TranslationTable from 'ui/Translation/Table';
import { GlobalContext } from 'use/global';
import ButtonLink from 'ui/Buttons/ButtonLink';

const Translations: React.FC<PageProperties> = ({ route }) => {
  const { langs, langID } = useContext(GlobalContext);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [orderBy, setOrderBy] = useState<string>();
  const [{ data, fetching, error }] = useTranslationsQuery(
    { variables: { limit, page, search, order, orderBy } },
  );

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
        langID={langID}
        langs={langs}
        loading={fetching}
        translations={data.translations.data}
        getLink={(translation) => `${route.location.pathname}/${translation.translationID}`}
        pagination={data.translations.pagination}
        fetchMore={({ page: page_, limit: limit_, search: search_, order: order_ }) => {
          setLimit(limit_);
          setPage(page_);
          setSearch(search_);
          if (order_) {
            setOrder(order_.order);
            setOrderBy(order_.orderBy);
          }
        }}
      />
    </div>
  );
};

export default Translations;
