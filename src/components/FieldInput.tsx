import React from 'react';

type FieldInputProps = { id: string; label: string; value: string; onChange: (value: string) => void; type?: string };
export function FieldInput({ id, label, value, onChange, type = 'text' }: FieldInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={label}
        value={value}
        autoComplete="on"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
