import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'PRIMARY' | 'OUTLINE' | 'ERROR';
  size?: 'NORMAL' | 'SMALL';
};
export default function Button({ children, onClick, className, disabled, type = 'PRIMARY', size = 'NORMAL' }: ButtonProps) {
  const outline = type === 'OUTLINE';
  const primary = type === 'PRIMARY';
  const error = type === 'ERROR';
  return (
    <button
      className={classNames(
        'text-white py-2 px-4 rounded font-bold',
        { 'text-sm leading-none': size === 'SMALL' },
        { 'opacity-50 cursor-not-allowed': primary && disabled },
        { 'hover:bg-blue-700 focus:outline-none focus:shadow-outline': primary && !disabled },
        { 'bg-blue-500': primary },
        { 'border border-white hover:border-transparent hover:text-blue-500 hover:bg-white': outline },
        { 'bg-red-500': error },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
