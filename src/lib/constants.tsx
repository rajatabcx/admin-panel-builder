import { Feature, FilterOperatorSymbol, Step } from './types';
import {
  BarChart3,
  Database,
  Eye,
  Lock,
  MessagesSquare,
  Table,
  Upload,
  Zap,
  LineChart,
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
  ZoomIn,
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

export const steps: Step[] = [
  {
    title: '1. Create an account',
    description: 'Sign up for free to get started. No credit card required.',
    icon: Upload,
    image: '/how-it-works/signup.png',
  },
  {
    title: '2. Create a new project',
    description:
      'Add your database connection string to get started. We only support PostgreSQL.',
    icon: Zap,
    image: '/how-it-works/create.png',
  },
  {
    title: '3. Manage your Database',
    description: "That's it! You can now do anything now.",
    icon: LineChart,
    image: '/how-it-works/use.png',
  },
];

export const problems = [
  {
    title: 'Time and Financial Drain',
    description:
      'Building and maintaining a database is a time-consuming and expensive process. It requires a lot of resources and expertise.',
    icon: <ZoomIn className='size-5' />,
  },
  {
    title: 'Expensive Solutions',
    description:
      'Traditional database management solutions are expensive and they have a learning curve that everyone has to learn.',
    icon: <BarChartHorizontal className='size-5' />,
  },
  {
    title: 'Dependency on Tech Teams',
    description:
      'Database management is a complex task that requires a lot of technical expertise. You may need to check one data but it takes time as you are dependent on tech teams.',
    icon: <CircleHelp className='size-5' />,
  },
];
