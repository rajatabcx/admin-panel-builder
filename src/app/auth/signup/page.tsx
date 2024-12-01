'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { signupSchema } from '@/lib/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/form/TextInput';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignup } from '@/hooks/auth.hooks';
import { ResponseType } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useSignup();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
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
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <TextInput
                name='name'
                placeholder='Name'
                control={form.control}
                label='Name'
              />
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
                <Button disabled={isPending} type='submit'>
                  Sign up{' '}
                  {isPending ? (
                    <Loader className='w-4 h-4 ml-2 animate-spin' />
                  ) : (
                    ''
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link href='/auth/signin' className='hover:underline'>
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
