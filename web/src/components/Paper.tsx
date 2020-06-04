import React, { ReactNode } from 'react';
import classNames from 'classnames';

type PaperProps = { children: ReactNode; className?: string };
export default function Paper({ children, className }: PaperProps) {
  return <div className={classNames('bg-white text-gray-800 shadow-md rounded p-8', className)}>{children}</div>;
}
