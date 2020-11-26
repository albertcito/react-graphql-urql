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
  langID: string;
  langIDGlobal: string;
}
const isAvaliable = (texts: VText[], langID: string) => {
  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < texts.length; i += 1) {
    const text = texts[i];
    if (text.originalLangID === langID) { return true; }
  }
  return false;
};

export default class LangColumn<T> implements TableColumnAbstract {
  public readonly column: ColumnTableProperties;

  constructor(properties: LangColumnProperties<T>) {
    const { indexID, langID, langIDGlobal, ...props } = properties;
    this.column = {
      title: langID,
      className: `fit-center-column lang lang_id-${langID}`,
      ...props,
      render: (_: string, data: T) => {
        const texts = data[indexID] as unknown as VText[];
        const isAvailable = isAvaliable(texts, langID);
        return <AvailableIcon isAvailable={isAvailable} isSelected={langID === langIDGlobal} />;
      },
    };
  }
}
