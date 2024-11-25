'use client';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Key, Fingerprint, Diamond, Loader } from 'lucide-react';

import { useRelation } from '@/hooks/dbRelation.hooks';
import { CustomTableNode } from '@/components/database/CustomTableNode';
import { CustomNode } from '@/lib/types';
import { getLayoutedElements } from '@/lib/utils';

export default function DatabasePage() {
  const { schema } = useParams<{ schema: string }>();
  const { data, isLoading } = useRelation(schema, !!schema);
  const nodeTypes = useMemo(() => ({ customTable: CustomTableNode }), []);

  const { nodes: tableNodes, edges: tableEdges } = useMemo(() => {
    const nodes: CustomNode[] = Object.keys(data?.data || {}).map(
      (tableName) => ({
        id: tableName,
        type: 'customTable',
        position: { x: 0, y: 0 }, // Initial position will be recalculated
        data: {
          tableName,
          columns: data?.data[tableName] || [],
        },
      })
    );

    const edges: Edge[] = [];
    for (const table of Object.keys(data?.data || {})) {
      const columns = data?.data[table] || [];
      for (const column of columns) {
        if (column?.isForeignKey) {
          edges.push({
            id: `${table}_${column.columnName}_${column.foreignKeyReference?.table}_${column.foreignKeyReference?.column}`,
            source: table,
            target: column.foreignKeyReference?.table,
            sourceHandle: `${table}_${column.columnName}`,
            targetHandle: `${column.foreignKeyReference?.table}_${column.foreignKeyReference?.column}`,
            type: 'smoothstep',
            animated: true,
          });
        }
      }
    }

    return { nodes, edges };
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (tableNodes.length) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(tableNodes, tableEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [tableNodes, tableEdges, setNodes, setEdges]);

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1'>
        {isLoading ? (
          <div className='h-full w-full flex justify-center items-center text-muted-foreground gap-2'>
            <Loader className='size-5 animate-spin' />{' '}
            <h1 className='text-sm'>Loading tables...</h1>
          </div>
        ) : (
          <ReactFlow
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodes={nodes}
            edges={edges}
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        )}
      </div>
      <div className='flex gap-6 justify-center bg-primary-foreground py-2'>
        <div className='flex items-center gap-2'>
          <Key className='size-4 text-muted-foreground' />
          Primary Key
        </div>
        <div className='flex items-center gap-2'>
          <Fingerprint className='size-4 text-muted-foreground' />
          Unique
        </div>
        <div className='flex items-center gap-2'>
          <Diamond className='size-4 text-muted-foreground' />
          Nullable
        </div>
        <div className='flex items-center gap-2'>
          <Diamond className='size-4 text-muted-foreground fill-white stroke-white' />
          Not Nullable
        </div>
      </div>
    </div>
  );
}
