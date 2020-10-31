import { gql } from '@apollo/client';

const langsQuery = gql`
  query Langs {
    langs {
      data{
        langID
        localname
        name
      }
    }
  }
`;

export const langsQueryPartial = gql`
  query langsQueryPartial {
    langs {
      data{
        langID
        name
      }
    }
  }
`;

export default langsQuery;
