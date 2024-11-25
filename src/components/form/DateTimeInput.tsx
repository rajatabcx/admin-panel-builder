'use client';

import { format } from 'date-fns';
import { CalendarIcon, Info } from 'lucide-react';
import { FieldValues, Path } from 'react-hook-form';
import { Control } from 'react-hook-form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface PropTypes<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  control: Control<T>;
  disabled?: boolean;
  info?: string;
}

export function DateTimePicker<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  disabled,
  info,
}: PropTypes<T>) {
  function handleTimeChange(
    currentValue: Date | undefined,
    type: 'hour' | 'minute',
    value: string
  ) {
    const currentDate = currentValue || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    }

    return newDate;
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>
            {label}
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  info
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none select-none'
                )}
                disabled={!info}
              >
                <Info className='w-4 h-4' />
              </TooltipTrigger>
              <TooltipContent asChild side='bottom' className='max-w-xs'>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !value && 'text-muted-foreground'
                  )}
                  disabled={disabled}
                >
                  {value ? (
                    format(value, 'MM/dd/yyyy HH:mm:ss')
                  ) : (
                    <span>{placeholder || 'MM/DD/YYYY HH:mm:ss'}</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <div className='sm:flex'>
                <Calendar
                  mode='single'
                  selected={value}
                  onSelect={(date) => {
                    if (date) {
                      onChange(date);
                    }
                  }}
                  initialFocus
                />
                <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {Array.from({ length: 24 }, (_, i) => i)
                        .reverse()
                        .map((hour) => (
                          <Button
                            key={hour}
                            size='icon'
                            variant={
                              value && value.getHours() === hour
                                ? 'default'
                                : 'ghost'
                            }
                            className='sm:w-full shrink-0 aspect-square'
                            onClick={() => {
                              onChange(
                                handleTimeChange(value, 'hour', hour.toString())
                              );
                            }}
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size='icon'
                            variant={
                              value && value.getMinutes() === minute
                                ? 'default'
                                : 'ghost'
                            }
                            className='sm:w-full shrink-0 aspect-square'
                            onClick={() =>
                              onChange(
                                handleTimeChange(
                                  value,
                                  'minute',
                                  minute.toString()
                                )
                              )
                            }
                          >
                            {minute.toString().padStart(2, '0')}
                          </Button>
                        )
                      )}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Please select your preferred date and time.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
