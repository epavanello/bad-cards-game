import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};
export default function HeaderButton({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white',
        className
      )}
    >
      {children}
    </button>
  );
}
