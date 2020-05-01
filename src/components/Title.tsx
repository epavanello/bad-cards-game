import React from 'react';
import classNames from 'classnames';

type TitleProps = { children: string; error?: boolean; className?: string };
export default function Title({ children, error, className }: TitleProps) {
  return (
    <h1
      className={classNames(
        'text-2xl font-bold text-center font-display tracking-wider',
        {
          'text-red-600': error,
        },
        className
      )}
    >
      {children}
    </h1>
  );
}
