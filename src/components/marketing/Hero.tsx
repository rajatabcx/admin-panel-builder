import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { AnimatedGradientText } from '@/components/magic-ui/animated-gradient-text';
import { BackgroundLines } from '@/components/aceternity-ui/background-lines';
import { User } from '@/lib/types';
import { buttonVariants } from '../ui/button';

export const Hero = ({ user }: { user: User | null }) => {
  return (
    <BackgroundLines>
      <section className='w-full py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center h-full'>
        <div className='container text-center'>
          <div className='z-10 flex min-h-28 items-center justify-center'>
            <AnimatedGradientText>
              🎉 <hr className='mx-2 h-4 w-px shrink-0 bg-gray-300' />{' '}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Introducing DataDock
              </span>
              <ChevronRight className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
            </AnimatedGradientText>
          </div>
          <div className='mx-auto flex max-w-screen-md flex-col gap-6'>
            <h1 className='text-3xl font-extrabold lg:text-6xl'>
              Simplify Your Database Management
            </h1>
            <p className='text-balance text-muted-foreground lg:text-lg'>
              Connect, visualize, and interact with your Postgres database
              effortlessly. Create powerful admin panels in minutes.
            </p>
            <p className='text-lg mb-8 font-semibold'>
              Built for both Techies & Non-Techies
            </p>
            <div className='relative'>
              {user ? (
                <Link href='/dashboard' className={cn(buttonVariants())}>
                  Dashboard
                </Link>
              ) : (
                <Link href='/auth/signup' className={cn(buttonVariants())}>
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </BackgroundLines>
  );
};
