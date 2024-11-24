import { Node } from '@xyflow/react';
import { ResponseType } from './constants';

export type ActionResponse = {
  type: ResponseType;
  message: string;
};

export interface NLQUpdateEvent {
  kind: 'UPDATE';
  status: string;
}
export interface NLQResponseEvent {
  kind: 'RESPONSE';
  type: 'TEXT' | 'TABLE';
  payload: string | Array<Record<string, any>>;
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

export type NLQAgentState = {
  query: string;
  intent?: string;
  relevantCatalog?: string[];
  relevantTables?: string[];
  queries?: string[];
  intermediateResults?: string[];
  aggregateQuery?: string;
  finalResult?: string;
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
