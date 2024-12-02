import { Shield } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ShineBorder } from '../magic-ui/shine-border';

export function Security() {
  return (
    <section className='py-16 px-6 md:px-12 lg:px-24'>
      <div className='mb-10 md:mb-20'>
        <h2 className='text-center text-3xl font-semibold lg:text-5xl'>
          Security First
        </h2>
      </div>
      <div className='flex justify-center items-center w-full'>
        <ShineBorder
          className='relative overflow-hidden rounded-lg border md:shadow-xl bg-card/60 backdrop-blur-sm max-w-3xl'
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
        >
          <Card className='max-w-3xl mx-auto border-none bg-transparent'>
            <CardHeader className='text-center'>
              <Shield className='w-16 h-16 text-primary mx-auto mb-4' />
              <CardTitle className='text-2xl !mb-4'>
                Your Data, Your Control
              </CardTitle>
              <CardDescription className='text-base'>
                We take your security seriously. Your database connection string
                is encrypted, and we can&apos;t access it. We&apos;re also
                implementing an even stronger encryption method that will be
                unique to each user, giving you full control over your data
                security.
              </CardDescription>
            </CardHeader>
          </Card>
        </ShineBorder>
      </div>
    </section>
  );
}
