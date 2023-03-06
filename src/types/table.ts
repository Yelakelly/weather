import { ColumnType } from 'antd/es/table';

export type IColumns<T> = IColumn<T>[];
export interface IColumn<T> extends Omit<ColumnType<T>, 'dataIndex'> {
  dataIndex?: keyof T;
}
