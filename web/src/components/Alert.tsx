import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AlertProps = { className?: string; title: string; message: string; onClose?: () => void };
export default function Alert({ className, title, message, onClose }: AlertProps) {
  return (
    <div className={classNames('bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md', className)} role="alert">
      <div className="flex flex-row">
        <div className="py-1">
          <FontAwesomeIcon className="text-red-500 mr-4" size="lg" icon={['fas', 'info-circle']} />
        </div>
        <div className="flex-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <div className="flex items-center w-4 h-4 justify-center" onClick={() => onClose()} role="button">
            <FontAwesomeIcon className="align-top" size="xs" icon={['fas', 'times']} title="Close" />
          </div>
        )}
      </div>
    </div>
  );
}
