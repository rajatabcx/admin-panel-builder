import React, { type FC } from 'react';
import {
  EdgeLabelRenderer,
  SmoothStepEdge,
  type Edge,
  type EdgeProps,
} from '@xyflow/react';

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className='nodrag nopan bg-background p-1'
    >
      {label}
    </div>
  );
}

export const CustomEdge: FC<
  EdgeProps<Edge<{ startLabel: string; endLabel: string }>>
> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) => {
  return (
    <>
      <SmoothStepEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      <EdgeLabelRenderer>
        {selected && (
          <>
            {data?.startLabel && (
              <EdgeLabel
                transform={`translate(${sourceX + 6}px,${sourceY - 12}px)`}
                label={data.startLabel}
              />
            )}
            {data?.endLabel && (
              <EdgeLabel
                transform={`translate(${targetX - 16}px,${targetY - 12}px)`}
                label={data.endLabel}
              />
            )}
          </>
        )}
      </EdgeLabelRenderer>
    </>
  );
};
