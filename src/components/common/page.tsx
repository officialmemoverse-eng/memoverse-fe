import React, { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type PageProps = React.ComponentProps<'div'>;

export const Page: FC<PropsWithChildren<PageProps>> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'w-full min-h-screen bg-[#f4f7fb] py-6 px-2 sm:px-6 overflow-x-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
