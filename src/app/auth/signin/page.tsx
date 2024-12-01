'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { signinSchema } from '@/lib/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/form/TextInput';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignin } from '@/hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { ResponseType } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useSignin();

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      const res = await mutateAsync(data);
      if (res.type === ResponseType.SUCCESS) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-full max-w-lg'>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <TextInput
                name='email'
                placeholder='Email'
                control={form.control}
                label='Email'
              />
              <TextInput
                name='password'
                placeholder='Password'
                control={form.control}
                label='Password'
                type='password'
              />
              <div className='flex justify-end'>
                <Button type='submit' disabled={isPending}>
                  Sign in{' '}
                  {isPending && (
                    <Loader className='ml-2 h-4 w-4 animate-spin' />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link href='/auth/signup' className='hover:underline'>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
