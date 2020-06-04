import React from 'react';
import { useSelector } from '../redux/store';

export function ProfileLogo() {
  const displayNameFirebase = useSelector((state) => state.displayName);
  return (
    <div
      className="bg-gray-600 text-gray-100 rounded-full h-12 w-12 flex items-center justify-center cursor-default cursor-pointer border-2 border-transparent hover:border-blue-600"
      title={displayNameFirebase}
    >
      {displayNameFirebase
        .split(/(-_| )+/)
        .map((w) => w.charAt(0).toUpperCase())
        .join(' ')}
    </div>
  );
}
