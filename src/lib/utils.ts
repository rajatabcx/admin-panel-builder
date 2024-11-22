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

export const convertRowsToCsv = (headers: string[], rows: any[]) => {
  if (!rows || rows.length === 0) return '';

  const csvHeaders = headers.join(','); // Extract column headers
  const csvRows = rows
    .map((row) => Object.values(row).join(',')) // Convert each row to CSV format
    .join('\n');

  return `${csvHeaders}\n${csvRows}`;
};

export const handleDownload = (csvData: string, fileName: string) => {
  // Create a Blob with CSV data
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  // Create an anchor tag and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
};
