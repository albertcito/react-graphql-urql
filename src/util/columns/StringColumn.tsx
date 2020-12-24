import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

type onSelectType<T> = (data: T, index: number) => void;
type getLinkType<T> = (data: T) => string;

interface StringColumnProperties<T> extends Omit<ColumnTableProperties, 'render' | 'sorter'> {
  indexID: keyof T;
  onSelectLink?: onSelectType<T>;
  getLink?: getLinkType<T>;
}

export default class StringColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: StringColumnProperties<T>) {
    const { indexID, onSelectLink, getLink, orderBy, ...props } = properties;
    this.column = {
      ...props,
      render: this.getRender(),
      sorter: !!orderBy,
      orderBy,
    };
  }

  private getRender() {
    if (this.properties.onSelectLink) {
      return this.getRenderButton(this.properties.onSelectLink);
    }
    if (this.properties.getLink) {
      return this.getRenderLink(this.properties.getLink);
    }
    return this.getRenderString();
  }

  private getRenderButton(onSelectLink: onSelectType<T>) {
    const { indexID } = this.properties;
    return (_: string, data: T, index: number) => (
      <Button
        onClick={() => onSelectLink(data, index)}
        type='link'
        className='link-button'
      >
        {data[indexID]}
      </Button>
    );
  }

  private getRenderLink(getLink: getLinkType<T>) {
    const { indexID } = this.properties;
    return (_: string, data: T) => (
      <Link to={getLink(data)}>
        {data[indexID]}
      </Link>
    );
  }

  private getRenderString() {
    const { indexID } = this.properties;
    return (_: string, data: T) => data[indexID];
  }
}
