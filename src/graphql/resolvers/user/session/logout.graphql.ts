import gql from 'graphql-tag';

const logoutQuery = gql`mutation logout { logout }`;
export default logoutQuery;
