import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { ColumnProps } from 'antd/lib/table';

import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

export interface ButtonColumnProperties<T> {
  onSelect: (data: T, index: number) => void;
  isLoading?: (data: T) => boolean;
  buttonText?: string;
  props?: ColumnProps<T>;
  btnProps?: ButtonProps;
}
export default class ButtonColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties<T>;

  constructor({
    buttonText = 'Select',
    onSelect,
    btnProps,
    props,
    isLoading,
  }: ButtonColumnProperties<T>) {
    const render = (_: string, data: T, index: number) => {
      const loading = isLoading ? isLoading(data) : false;
      return (
        <Button
          {...btnProps}
          loading={loading}
          disabled={loading}
          onClick={() => onSelect(data, index)}
        >
          {buttonText}
        </Button>
      );
    };
    this.column = {
      className: 'select-row',
      title: 'Select',
      ...props,
      render,
    };
  }
}
