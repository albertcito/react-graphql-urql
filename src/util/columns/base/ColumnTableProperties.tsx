/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnProps } from 'antd/lib/table';

export interface ColumnTableProperties<T = any> extends ColumnProps<T> {
  orderBy?: string;
}
