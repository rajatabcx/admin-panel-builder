'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { steps } from '@/lib/constants';

export function HowToUse() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5050);

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className='relative mx-auto max-w-6xl px-4 py-12'>
      <div className='text-center mb-12'>
        <h2 className='text-sm font-medium tracking-wider text-muted-foreground uppercase mb-4'>
          HOW IT WORKS
        </h2>
        <h3 className='text-4xl font-bold'>Just 3 steps to get started</h3>
      </div>

      <div className='relative'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <AnimatePresence mode='wait'>
              <>
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentStep === index ? 1 : 0.3,
                      y: 0,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      'space-y-4 transition-opacity relative py-5',
                      currentStep === index ? 'opacity-100' : 'opacity-30'
                    )}
                  >
                    {/* Progress bar */}
                    <div className='absolute left-0 top-0 bottom-0 w-[1px] bg-muted'>
                      <motion.div
                        className='absolute w-[1px] bg-muted-foreground'
                        animate={{
                          height: currentStep === index ? `${progress}%` : '0%',
                        }}
                        transition={{
                          duration: 0.05,
                          ease: 'linear',
                        }}
                      />
                    </div>
                    <div className='flex items-center gap-4 pl-4'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                        <step.icon className='h-6 w-6' />
                      </div>
                      <h4 className='text-xl font-semibold'>{step.title}</h4>
                    </div>
                    <p className='text-muted-foreground pl-4'>
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </>
            </AnimatePresence>
          </div>

          <div className='relative h-[400px] overflow-hidden rounded-lg'>
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentStep}
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover',
                  currentStep === 2 ? 'object-left' : ''
                )}
                initial={{ opacity: 0, scale: currentStep === 2 ? 1.1 : 1.7 }}
                animate={{ opacity: 1, scale: currentStep === 2 ? 1 : 1.5 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
