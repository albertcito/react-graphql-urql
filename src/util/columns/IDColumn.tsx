import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

interface ColumnProperties<T> extends ColumnTableProperties{
  indexID: keyof T;
}

export default class IDColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties<T>;

  constructor({ indexID, ...props }: ColumnProperties<T>) {
    this.column = {
      title: 'ID',
      className: 'fit-center-column',
      ...props,
      render: (_: string, data: T) => data[indexID],
    };
  }
}
