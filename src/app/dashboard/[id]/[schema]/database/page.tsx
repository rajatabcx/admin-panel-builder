'use client';
import React, { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams } from 'next/navigation';

import { useRelation } from '@/hooks/dbRelation.hooks';
import { CustomTableNode } from '@/components/database/CustomTableNode';


export default function DatabasePage() {
  const { schema } = useParams<{ schema: string }>();
  const { data } = useRelation(schema, !!schema);
  const nodeTypes = useMemo(() => ({ customTable: CustomTableNode }), []);
  
  const tableNodes = useMemo(()=>{
    return Object.keys(data?.data || {}).map(tableName=>({
      id: tableName,
      type: 'customTable',
      position: { x: 0, y: 0 },
      data: {
        tableName,
        columns: data?.data[tableName]
      }
    })) 
  }, [data])

  const tableEdges = useMemo(()=>{
    const edges= []
    for(const table of Object.keys(data?.data || {})){
      const columns= data?.data[table] || []
      for(const column of columns){
        if(column?.isForeignKey){
          edges.push({
            id: ``,
            source: ``,
            target: ``
          })
        }
      }
    }
  }, [data])

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(()=>{
    if(tableNodes.length){
      setNodes(tableNodes)
      setEdges(tableEdges)
    }
  }, [tableNodes])
 
  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodes={nodes}
        edges={edges}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
