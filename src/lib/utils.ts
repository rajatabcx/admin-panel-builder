import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import dagre from 'dagre';
import { CustomNode } from '@/lib/types';
import { Edge } from '@xyflow/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCellValue = (
  value: any,
  type: string,
  universalSearch: string
) => {
  if (value === null) return `<span class='text-muted-foreground'>NULL</span>`;
  if (!value) return `<span class='text-muted-foreground'>EMPTY</span>`;

  // Format the value first
  let formattedValue = '';
  switch (type.toLowerCase()) {
    case 'datetime':
    case 'date':
    case 'timestamp':
    case 'timestamptz':
      formattedValue = format(value, 'MM/dd/yyyy, HH:mm:ss');
      break;
    case 'json':
    case 'jsonb':
      formattedValue = JSON.stringify(value, null, 2);
      break;
    case 'boolean':
      formattedValue = value ? 'Yes' : 'No';
      break;
    case 'number':
    case 'integer':
    case 'float':
      formattedValue =
        typeof value === 'number' ? value.toLocaleString() : value;
      break;
    default:
      formattedValue = String(value);
  }

  // If there's a universal search term, wrap matching parts with mark tags
  if (universalSearch) {
    const regex = new RegExp(`(${universalSearch})`, 'gi');
    return formattedValue.replace(
      regex,
      '<mark class="bg-yellow-400 px-1 rounded">$1</mark>'
    );
  }

  return formattedValue;
};

export const convertRowsToCsv = (headers: string[], rows: any[]) => {
  if (!rows || rows.length === 0) return '';

  const csvHeaders = headers.join(','); // Extract column headers
  const csvRows = rows
    .map((row) =>
      Object.values(row)
        .map((item) =>
          typeof item === 'object' && item !== null
            ? JSON.stringify(item).replace(/,/g, ' - ')
            : item
        )
        .join(',')
    ) // Convert each row to CSV format
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

// postgres type to form input type mapping
export const pgTypeMapping: Record<string, string> = {
  text: 'text',
  varchar: 'text',
  character: 'text',
  integer: 'number',
  int4: 'number',
  bigint: 'number',
  numeric: 'number',
  decimal: 'number',
  boolean: 'checkbox',
  bool: 'checkbox',
  date: 'date',
  timestamp: 'datetime-local',
  timestamptz: 'datetime-local',
  time: 'time',
  json: 'textarea',
  jsonb: 'textarea',
  uuid: 'text',
};

export enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const getLayoutedElements = (nodes: CustomNode[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'LR',
    nodesep: 200,
    ranksep: 150,
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to dagre with dynamic sizing
  nodes.forEach((node) => {
    // Calculate height based on number of columns (assuming columns are in node.data)
    const columnCount = node.data?.columns?.length || 0;
    const headerHeight = 40; // Height for table name
    const rowHeight = 40; // Height per column row
    const padding = 0; // Padding for the container

    const width = 250; // Keep width fixed or adjust if needed
    const height = headerHeight + columnCount * rowHeight + padding * 2;

    dagreGraph.setNode(node.id, { width, height });
  });

  // Add edges to dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Get new positions
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = nodeWithPosition.width;
    const height = nodeWithPosition.height;

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export const getEdgeLabel = (
  relationshipType: string
): { data: { startLabel: string; endLabel: string } } => {
  if (relationshipType === 'ONE_TO_ONE')
    return { data: { startLabel: '1', endLabel: '1' } };
  else if (relationshipType === 'ONE_TO_MANY')
    return { data: { startLabel: 'N', endLabel: '1' } };
  else if (relationshipType === 'MANY_TO_ONE')
    return { data: { startLabel: '1', endLabel: 'N' } };
  else if (relationshipType === 'MANY_TO_MANY')
    return { data: { startLabel: 'N', endLabel: 'M' } };
  return { data: { startLabel: '', endLabel: '' } };
};
