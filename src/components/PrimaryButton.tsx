import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
};
export default function PrimaryButton({ children, onClick, className, disabled }: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        'bg-blue-500 text-white font-bold py-2 px-4 rounded',
        { 'opacity-50 cursor-not-allowed': disabled },
        { 'hover:bg-blue-700 focus:outline-none focus:shadow-outline': !disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
