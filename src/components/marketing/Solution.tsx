import { BellIcon, CalendarIcon, FileTextIcon, GlobeIcon } from 'lucide-react';

import { BentoCard, BentoGrid } from '@/components/magic-ui/bento-grid';
import { InputIcon } from '@radix-ui/react-icons';

const features = [
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '/',
    cta: 'Learn more',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: InputIcon,
    name: 'Full text search',
    description: 'Search through all your files in one place.',
    href: '/',
    cta: 'Learn more',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: GlobeIcon,
    name: 'Multilingual',
    description: 'Supports 100+ languages and counting.',
    href: '/',
    cta: 'Learn more',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: CalendarIcon,
    name: 'Calendar',
    description: 'Use the calendar to filter your files by date.',
    href: '/',
    cta: 'Learn more',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BellIcon,
    name: 'Notifications',
    description:
      'Get notified when someone shares a file or mentions you in a comment.',
    href: '/',
    cta: 'Learn more',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

export async function Solutions() {
  return (
    <div className='py-16 px-6 md:px-12 lg:px-24'>
      <div className='mb-10 md:mb-20'>
        <p className='text-center text-sm text-muted-foreground uppercase mb-4'>
          Solutions
        </p>
        <h2 className='text-center text-3xl font-semibold lg:text-5xl'>
          You need more than just a table viewer
        </h2>
      </div>
      <BentoGrid className='lg:grid-rows-3'>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
