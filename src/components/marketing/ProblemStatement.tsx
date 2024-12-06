import { problems } from '@/lib/constants';

export const ProblemStatement = () => {
  return (
    <div className='py-16 px-6 md:px-12 lg:px-24 bg-primary-foreground h-screen flex items-center justify-center'>
      <div>
        <div className='mb-10 md:mb-20'>
          <p className='text-sm font-medium tracking-wider text-muted-foreground uppercase mb-4 text-center'>
            PROBLEM
          </p>
          <h2 className='mb-2 text-center text-3xl font-semibold lg:text-5xl'>
            Database management is hard
          </h2>
        </div>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {problems.map((problems, i) => (
            <div key={i} className='flex flex-col'>
              <div className='mb-5 flex size-12 items-center justify-center rounded-full bg-accent'>
                {problems.icon}
              </div>
              <h3 className='mb-2 text-base font-semibold'>{problems.title}</h3>
              <p className='text-muted-foreground text-sm'>
                {problems.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
