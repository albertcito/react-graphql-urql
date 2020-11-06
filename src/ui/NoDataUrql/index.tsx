import React from 'react';
import { CombinedError } from 'urql';

import AlertError from 'ui/Alert/AlertError';

interface NoDataUrqlProperties {
  fetching: boolean;
  error?: CombinedError;
}
const NoDataUrql: React.FC<NoDataUrqlProperties> = ({
  fetching,
  error,
}) => {
  if (fetching) {
    return <div> Loading... </div>;
  }
  if (error) {
    return <AlertError error={error} />;
  }
  return <div>Something is wrong</div>;
};

export default NoDataUrql;
