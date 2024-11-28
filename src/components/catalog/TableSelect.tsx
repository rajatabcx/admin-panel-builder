import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function TableSelect({
  name,
  selected,
  handleSelect,
  schema,
}: {
  name: string;
  selected: string[];
  schema: string;
  handleSelect: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}) {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        id={name}
        className='size-4'
        checked={selected.includes(name)}
        onCheckedChange={(checked) => {
          if (checked) {
            handleSelect((prev) => ({
              ...prev,
              [schema]: [...(prev[schema] || []), name],
            }));
          } else {
            handleSelect((prev) => {
              const newValue = prev[schema].filter((table) => table !== name);
              if (newValue.length === 0) {
                const { [schema]: _, ...rest } = prev;
                return rest;
              }
              return {
                ...prev,
                [schema]: newValue,
              };
            });
          }
        }}
      />
      <Label
        htmlFor={name}
        className='text-sm flex items-center gap-2 cursor-pointer'
      >
        {name}
      </Label>
    </div>
  );
}
