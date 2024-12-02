import { Feature, FilterOperatorSymbol } from './types';
import {
  BarChart3,
  Database,
  Eye,
  Lock,
  MessagesSquare,
  Table,
} from 'lucide-react';

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
  GENERATING_QUERIES = 'Generating queries...',
  EXECUTING_QUERIES = 'Executing queries...',
  GENERATING_RESPONSE = 'Generating response...',
  TASK_COMPLETED = 'Agent has completed the task.',
  TASK_FAILED = 'Agent has failed to complete the task.',
  RELEVANT_TABLES = 'Finding relevant tables...',
  INTENT_ANALYSIS = 'Analyzing intent...',
}

export const features: Feature[] = [
  {
    title: 'Natural Language Query',
    description: 'Chat with your database using simple, natural language.',
    icon: <MessagesSquare className='size-5' />,
  },
  {
    title: 'Database Visualizer',
    description: 'Visualize your database architecture and connections.',
    icon: <Database className='size-5' />,
  },
  {
    title: 'Smart Table View',
    description:
      'Sort and filter data with modes for technical and non-technical users.',
    icon: <Table className='size-5' />,
  },
  {
    title: 'Customizable Context',
    description: "Limit the chatbot's access to specific tables and schemas.",
    icon: <Eye className='size-5' />,
  },
  {
    title: 'Views (Coming Soon)',
    description:
      'Save queries and generate custom views as tables, cards, or graphs.',
    icon: <BarChart3 className='size-5' />,
  },
  {
    title: 'Secure Connection',
    description:
      'Your database connection string is encrypted and inaccessible to us.',
    icon: <Lock className='size-5' />,
  },
];
