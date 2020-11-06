import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

type onSelectType<T> = (data: T, index: number) => void;
type getLinkType<T> = (data: T) => string;

interface StringColumnProperties<T> extends ColumnTableProperties {
  indexID: keyof T;
  onSelect?: onSelectType<T>;
  getLink?: getLinkType<T>;
}

export default class StringColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: StringColumnProperties<T>) {
    const { indexID, onSelect, getLink, orderBy, ...props } = properties;
    this.column = {
      ...props,
      render: this.getRender(),
      sorter: !!orderBy,
      orderBy,
    };
  }

  private getRender() {
    if (this.properties.onSelect) {
      return this.getRenderButton(this.properties.onSelect);
    }
    if (this.properties.getLink) {
      return this.getRenderLink(this.properties.getLink);
    }
    return this.getRenderString();
  }

  private getRenderButton(onSelect: onSelectType<T>) {
    const { indexID } = this.properties;
    return (_: string, data: T, index: number) => (
      <Button
        onClick={() => onSelect(data, index)}
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
