const getDefaultSortOrder = (
  orderBy: string, initialOrderBy?: string, initialOrder?: string,
) => {
  if (orderBy === initialOrderBy && initialOrder) {
    switch (initialOrder) {
      case 'ASC': return 'ascend';
      default: return 'descend';
    }
  }
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};

export default getDefaultSortOrder;
