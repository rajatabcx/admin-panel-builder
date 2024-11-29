import { Node } from '@xyflow/react';
import { ResponseType } from './constants';

export type ActionResponse = {
  type: ResponseType;
  message: string;
};

export enum NLQResponse {
  UPDATE = 'UPDATE',
  RESPONSE = 'RESPONSE',
}

export interface NLQUpdateEvent {
  kind: NLQResponse.UPDATE;
  status: string;
}
export interface NLQResponseEvent {
  kind: NLQResponse.RESPONSE;
  type: 'TEXT' | 'TABLE';
  payload: string;
  responseType: ResponseType;
}

type SortingType = 'ASC' | 'DESC';
export type SortingColumn = {
  name: string;
  type: SortingType;
};

export type FilterOperatorSymbol =
  | '='
  | '<>'
  | '>'
  | '<'
  | '>='
  | '<='
  | '~~'
  | '~~*'
  | 'IN'
  | 'IS'
  | 'IS NOT';

export type FilterColumn = {
  name: string;
  operator: FilterOperatorSymbol;
  value: string;
};

export type ColumnInfo = {
  tableName: string;
  columnName: string;
  columnType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isUnique: boolean;
} & (
  | {
      isForeignKey: true;
      foreignKeyReference: {
        table: string;
        column: string;
        relationType: string;
      };
    }
  | {
      isForeignKey: false;
    }
);

export type CustomNodeData = {
  tableName: string;
  columns: ColumnInfo[];
};

export type CustomNode = Node<CustomNodeData>;

export type Catalog = {
  schemas: Schema[];
};

export type Schema = {
  name: string;
  description: string;
  tables: Table[];
};

export type Table = {
  name: string;
  description: string;
  columns?: Column[];
};

export type Column = {
  name: string;
  description: string;
  columnType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isUnique: boolean;
  isForeignKey: boolean;
  foreignKeyReference?: {
    table: string;
    column: string;
    relationType: string;
  };
};
