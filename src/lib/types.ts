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
