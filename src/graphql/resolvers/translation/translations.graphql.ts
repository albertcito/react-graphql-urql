import gql from 'graphql-tag';

const translationsQuery = gql`query translations(
    $order: String,
    $orderBy: String,
    $search: String,
    $limit: Int,
    $page: Int,
    $langID: String
  ) {
  translations(
    order: $order,
    orderBy: $orderBy,
    search: $search,
    limit: $limit,
    page:$page,
    langID: $langID
  ) {
    pagination {
      from
      to
      total
      limit
      page
      length
    }
    data {
      translationID
      code
      texts {
        langID
        originalLangID
      }
      text(langID: $langID) {
        text
        langID
        originalLangID
      }
    }
  }
}`;

export default translationsQuery;
