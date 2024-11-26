import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Maximize2 } from 'lucide-react';

export default function ExpandedData({
  data,
  updating,
  tableName,
}: {
  data: any;
  tableName: string;
  updating?: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Maximize2 className='cursor-pointer hover:text-primary transition-all text-muted-foreground size-4 opacity-0 group-hover:opacity-100' />
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-2xl overflow-auto'>
        <SheetHeader>
          <SheetTitle className='text-left'>
            {updating
              ? `Updating rows from ${tableName} table`
              : 'Inserting row into table'}
          </SheetTitle>
          <SheetDescription>Some description will go here</SheetDescription>
          <div className='overflow-auto h-full'>
            <pre className='text-sm text-muted-foreground whitespace-break-spaces text-left'>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
