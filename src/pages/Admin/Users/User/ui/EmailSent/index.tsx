import React from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useEmailLogsQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import EmailSentTable from './Table';
import useTable from 'ui/Tables/Table/useTable';

interface EmailSentProperties {
  user: UserQuery['user'];
}
const EmailSent: React.FC<EmailSentProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = useEmailLogsQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Email updated - ${user.fullName}`);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <Title level={3}>
        Emails Sent
      </Title>
      <EmailSentTable
        dataSource={data.emailLogs.data}
        pagination={data.emailLogs.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default EmailSent;
