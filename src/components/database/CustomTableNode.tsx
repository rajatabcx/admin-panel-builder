import { Handle } from "@xyflow/react";
import { Diamond, ExternalLink, Fingerprint, Key, Table2 } from "lucide-react";
import Link from "next/link";

export function CustomTableNode({ data }) {
  return (
    <>
      <div className="border bg-background w-[285px] rounded-md">
        <div className="flex items-center justify-between px-2 py-2">
        <h1 className="text-sm flex gap-2 items-center"><Table2 className="size-4 text-muted-foreground"/>{data?.tableName}</h1>
        <Link href={'/'}>
        <ExternalLink className="size-4 text-muted-foreground"/>
        </Link>
        </div>
        {data?.columns.map((column) => (
          <div className="py-2 px-2 bg-primary-foreground border-t flex items-center justify-between">
            <div className="flex justify-start items-center gap-2">
            {column?.isPrimaryKey ? <Key className="size-4 text-muted-foreground"/> : null}
            {column?.isUnique ? <Fingerprint className="size-4 text-muted-foreground"/> : null}
            {column?.isNullable ? <Diamond className="size-4 text-muted-foreground"/> : <Diamond className="size-4 text-muted-foreground fill-white stroke-white"/>}
            <p>{column.columnName}</p>
            </div>
            <p className="text-muted-foreground">{column.columnType}</p>
            {column?.isForeignKey ? <>
                <Handle type='source' id={`${data?.tableName}_${column?.columnName}`}/>
            </> : <Handle type='target' id={`${data?.tableName}_${column?.columnName}`}/>}
          </div>
        ))}
      </div>
    </>
  );
}
