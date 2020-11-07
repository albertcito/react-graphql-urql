import { RouteComponentProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface PageProperties<RouteParameters = any> {
  route: RouteComponentProps<RouteParameters>;
}
