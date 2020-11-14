import React from 'react';

import { ColumnTableProperties } from '../base/ColumnTableProperties';
import TableColumnAbstract from '../base/TableColumnAbstract';
import AvailableIcon from './AvailableIcon';

interface VText {
  langID: string;
  originalLangID: string;
}

interface LangColumnProperties<T> extends ColumnTableProperties {
  indexID: keyof T;
}

export default class LangColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(private readonly properties: LangColumnProperties<T>) {
    const { indexID, ...props } = properties;
    this.column = {
      ...props,
      render: this.getRender(),
    };
  }

  private getRender() {
    const { indexID } = this.properties;
    return (_: string, data: T) => {
      const text = data[indexID] as unknown as VText;
      const isAvailable = (text.langID !== text.originalLangID);
      return <AvailableIcon isAvailable={isAvailable} />;
    };
  }
}
