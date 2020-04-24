import React from 'react';
import classNames from 'classnames';

type FieldInputProps = { id: string; label: string; value: string; readonly?: boolean; onChange?: (value: string) => void; type?: string };
export function FieldInput({ id, label, value, readonly, onChange, type = 'text' }: FieldInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className={classNames(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight',
          { 'bg-gray-200 cursor-not-allowed outline-none': readonly },
          { 'focus:outline-none focus:shadow-outline': !readonly }
        )}
        id={id}
        type={type}
        placeholder={label}
        value={value}
        autoComplete="on"
        readOnly={readonly}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
    </div>
  );
}
