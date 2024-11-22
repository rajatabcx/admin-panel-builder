import { FilterOperatorSymbol } from './types';

export enum ResponseType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export const filterOperators: {
  symbol: FilterOperatorSymbol;
  description: string;
}[] = [
  { symbol: '=', description: '= equals' },
  { symbol: '<>', description: '<> not equal' },
  { symbol: '>', description: '> greater than' },
  { symbol: '<', description: '< less than' },
  { symbol: '>=', description: '>= greater than or equal' },
  { symbol: '<=', description: '<= less than or equal' },
  { symbol: '[~~]', description: '[~~] like operator' },
  { symbol: '[~~*]', description: '[~~*] ilike operator' },
  { symbol: '[in]', description: '[in] one of a list of values' },
  {
    symbol: '[is]',
    description: '[is] checking for (null, not null, true, false)',
  },
];
