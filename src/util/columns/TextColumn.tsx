import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { ColumnTableProperties } from './base/ColumnTableProperties';
import TableColumnAbstract from './base/TableColumnAbstract';

type onSelectType<T> = (data: T, index: number) => void;
type getLinkType<T> = (data: T) => string;

interface VText {
  text: string;
  langID: string;
  originalLangID: string;
}

interface TextColumnProperties<T> extends ColumnTableProperties {
  indexID: keyof T;
  onSelectLink?: onSelectType<T>;
  getLink?: getLinkType<T>;
}

export default class TextColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: TextColumnProperties<T>) {
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
    return (_: string, data: T, index: number) => {
      const text = data[indexID] as unknown as VText;
      return (
        <Button
          onClick={() => onSelectLink(data, index)}
          type='link'
          className='link-button'
        >
          {text.text}
        </Button>
      );
    };
  }

  private getRenderLink(getLink: getLinkType<T>) {
    const { indexID } = this.properties;
    return (_: string, data: T) => {
      const text = data[indexID] as unknown as VText;
      return (
        <Link to={getLink(data)}>
          {text.text}
        </Link>
      );
    };
  }

  private getRenderString() {
    const { indexID } = this.properties;
    return (_: string, data: T) => {
      const text = data[indexID] as unknown as VText;
      return text.text;
    };
  }
}
