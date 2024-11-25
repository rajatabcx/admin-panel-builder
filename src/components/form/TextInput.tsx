import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PropTypes<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  control: Control<T>;
  disabled?: boolean;
  isTextarea?: boolean;
  info?: string;
  Icon?: React.ElementType;
  type?: 'text' | 'password' | 'number' | 'email';
}

export function TextInput<T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  disabled,
  isTextarea,
  info,
  Icon,
  type = 'text',
}: PropTypes<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? (
            <FormLabel className='flex items-center gap-2'>
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
          ) : null}
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                disabled={disabled}
                autoCapitalize='none'
                autoComplete={name}
                autoCorrect='off'
                className='bg-background'
                {...field}
              />
            ) : (
              <div className='relative'>
                {Icon ? (
                  <Icon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                ) : null}
                <Input
                  type={
                    type === 'password'
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : type
                  }
                  placeholder={placeholder}
                  autoCapitalize='none'
                  autoComplete={name}
                  autoCorrect='off'
                  disabled={!!disabled}
                  className={cn(
                    'bg-background text-foreground',
                    Icon ? 'pl-10' : ''
                  )}
                  {...field}
                />
                {type === 'password' ? (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                    <span className='sr-only'>
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                ) : null}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
