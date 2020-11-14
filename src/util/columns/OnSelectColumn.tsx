import React from 'react';
import { Button } from 'antd';

import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

type onSelectType<T> = (data: T, index: number) => void;

interface OnSelectColumnProperties<T> extends ColumnTableProperties {
  indexID: keyof T;
  onSelect: onSelectType<T>;
}

export default class OnSelectColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: OnSelectColumnProperties<T>) {
    const { indexID, onSelect, ...props } = properties;
    this.column = {
      ...props,
      render: this.getRender(onSelect),
    };
  }

  private getRender(onSelect: onSelectType<T>) {
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
}
