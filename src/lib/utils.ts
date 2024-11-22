import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCellValue = (value: any, type: string) => {
  if (value === null) return 'NULL';

  if (!value) return 'EMPTY';

  switch (type.toLowerCase()) {
    case 'datetime':
    case 'date':
    case 'timestamp':
    case 'timestamptz':
      return format(value, 'MM/dd/yyyy, HH:mm:ss');
    case 'json':
    case 'jsonb':
      return JSON.stringify(value, null, 2);
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'number':
    case 'integer':
    case 'float':
      return typeof value === 'number' ? value.toLocaleString() : value;
    default:
      return String(value);
  }
};
