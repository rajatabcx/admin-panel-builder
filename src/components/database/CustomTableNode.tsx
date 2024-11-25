import { Handle, Position } from "@xyflow/react";
import { Diamond, ExternalLink, Fingerprint, Key, Table2 } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "next/navigation";

import { CustomNodeData } from "@/lib/types";

export function CustomTableNode({ data }: { data: CustomNodeData }) {
  const { id, schema } = useParams<{ id: string; schema: string }>();
  return (
    <>
      <div className="border bg-background w-[285px] rounded-md">
        <div className="flex items-center justify-between px-2 h-10">
          <h1 className="text-sm flex gap-2 items-center w-[200px] truncate">
            <Table2 className="size-4 text-muted-foreground" />
            {data?.tableName}
          </h1>
          <Link href={`/dashboard/${id}/${schema}/table/${data?.tableName}`}>
            <ExternalLink className="size-4 text-muted-foreground" />
          </Link>
        </div>
        {data?.columns.map((column, index) => (
          <div
            key={`${column.columnName}_${index}`}
            className="px-2 bg-primary-foreground border-t flex items-center justify-between cursor-default hover:bg-accent h-10 relative"
          >
            <div className="flex justify-start items-center gap-2">
              {column?.isPrimaryKey ? (
                <Key className="size-4 text-muted-foreground" />
              ) : null}
              {column?.isUnique ? (
                <Fingerprint className="size-4 text-muted-foreground" />
              ) : null}
              {column?.isNullable ? (
                <Diamond className="size-4 text-muted-foreground" />
              ) : (
                <Diamond className="size-4 text-muted-foreground fill-current stroke-current" />
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="w-[100px] truncate">{column.columnName}</p>
                </TooltipTrigger>
                <TooltipContent asChild side="bottom">
                  <p className="p-1">{column.columnName}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-muted-foreground w-[100px] truncate">
                  {column.columnType}
                </p>
              </TooltipTrigger>
              <TooltipContent asChild side="bottom">
                <p className="p-1">{column.columnType}</p>
              </TooltipContent>
            </Tooltip>
            {column?.isForeignKey ? (
              <Handle
                type="source"
                id={`${data?.tableName}_${column?.columnName}`}
                position={Position.Right}
                className="opacity-0 !pointer-events-none -translate-y-[50%] top-[50%]"
              />
            ) : (
              <Handle
                type="target"
                id={`${data?.tableName}_${column?.columnName}`}
                position={Position.Left}
                className="opacity-0 !pointer-events-none -translate-y-[50%] top-[50%]"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
