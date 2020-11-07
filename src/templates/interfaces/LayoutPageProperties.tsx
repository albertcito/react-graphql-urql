import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageProperties from 'routes/PageProperties';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface LayoutPageProperties<RouteParameters = any> {
  Component: React.FC<PageProperties>;
  route: RouteComponentProps<RouteParameters>;
}
