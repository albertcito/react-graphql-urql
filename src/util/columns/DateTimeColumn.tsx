import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

type onSelectType<T> = (data: T, index: number) => void;
type getLinkType<T> = (data: T) => string;

interface DateTimeColumnProperties<T> extends Omit<ColumnTableProperties, 'render' | 'sorter'> {
  indexID: keyof T;
  onSelectLink?: onSelectType<T>;
  getLink?: getLinkType<T>;
}

const dateShortFormat = (date: number) => {
  const langID = 'en-US';
  return new Date(date * 1000).toLocaleDateString(
    langID,
    { year: 'numeric', month: 'short', day: 'numeric' },
  );
};

export default class DateTimeColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: DateTimeColumnProperties<T>) {
    const { indexID, onSelectLink, getLink, orderBy, ...props } = properties;
    this.column = {
      ...props,
      render: this.getDate(),
      sorter: !!orderBy,
      orderBy,
    };
  }

  private getDate() {
    const { indexID } = this.properties;
    return (_: string, data: T) => {
      const date = data[indexID];
      return dateShortFormat(date as unknown as number);
    };
  }
}
