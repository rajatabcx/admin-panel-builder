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
  { symbol: '~~', description: '[~~] like operator' },
  { symbol: '~~*', description: '[~~*] ilike operator' },
  { symbol: 'IN', description: '[in] one of a list of values' },
  {
    symbol: 'IS',
    description: '[is] checking for (null, not null, true, false)',
  },
  {
    symbol: 'IS NOT',
    description: '[is not] checking for (null, not null, true, false)',
  },
];

export const isNotIsValuesDropdown = [
  { label: 'Null', value: 'NULL' },
  { label: 'True', value: 'TRUE' },
  { label: 'False', value: 'FALSE' },
  { label: 'Unknown', value: 'UNKNOWN' },
  { label: 'Known', value: 'KNOWN' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Infinite', value: 'INFINITE' },
  { label: 'Finite', value: 'FINITE' },
  { label: 'Document', value: 'DOCUMENT' },
];

export enum NlqStatus {
  ANALYZING_INTENT = 'Analyzing the intent of the query...',
  CATALOGING = 'Cataloging data...',
  GENERATING_QUERIES = 'Generating queries...',
  EXECUTING_QUERIES = 'Executing queries...',
  EXECUTE_REFINED_QUERY = 'Executing the refined query...',
  EVALUATING_RESULTS = 'Evaluating results...',
  REFINING_QUERY = 'Refining the query...',
  TASK_COMPLETED = 'Agent has completed the task.',
  TASK_FAILED = 'Agent has failed to complete the task.',
}
