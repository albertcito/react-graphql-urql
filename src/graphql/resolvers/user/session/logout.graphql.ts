import { gql } from '@apollo/client';

const logoutQuery = gql`mutation logout { logout }`;
export default logoutQuery;
